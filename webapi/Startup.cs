using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;

namespace Server;

public class Startup {
        
    public Startup(IConfiguration configuration) {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services) {

        // Configure MongoDB
        string connectionString = Configuration.GetConnectionString("MongoDbConnection")!;
        services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
        services.AddSingleton<IMongoDatabase>(provider => {
            var client = provider.GetRequiredService<IMongoClient>();
            return client.GetDatabase("mongo_db");
        });

        services.AddAuthorization();

        services.AddControllersWithViews();

        // Add Swagger
        services.AddSwaggerGen(c => {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "BoardAPI", Version = "v1" });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {

        if (env.IsDevelopment()) {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BoardAPI v1"));
        }

        app.UseMiddleware<RateLimit>(100, TimeSpan.FromMinutes(1));

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthorization();
        app.UseAuthentication();

        app.UseEndpoints(endpoints => {
            endpoints.MapControllers();
        });
    }
}