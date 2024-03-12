using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Server.Models;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace webserver.Controllers;

/// <summary>
/// Controller class handling PageMedia and MediaFiles
/// 
/// C.reate: post a media_file. If it's page doesnt exist, create it
/// R.ead: read a page
/// U.pdate: change a media_files's properties
/// D.elete: delete a media_file. If it's page is now empty, delete the page
/// 
/// </summary>
[ApiController]
[Route("api/v1/medias")]
[Produces("application/json")]
public class MediaController : ControllerBase {

    private readonly IMongoCollection<MediaFile> _PageMediaCollection;

    /// <summary>
    /// Controller class for Appointment CRUD requests
    /// </summary>
    public MediaController(IMongoClient mongoClient) {
        _PageMediaCollection = mongoClient.GetDatabase("mongo_db").GetCollection<MediaFile>("PageMedia");
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(MediaFile))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet("{id}")]
    public async Task<IActionResult> ReadPage(Guid id) {

        var log = await _PageMediaCollection.FindAsync(s => s.Id == id);

        if(log==null) {
            return NotFound();
        }

        var response = JsonConvert.SerializeObject(log);
        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(MediaFile))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    [HttpPut]
    public async Task<IActionResult> UpdateFile([FromBody] MediaFile upAppointment) {
        
        var existingLog = await _appointmentsCollection.Find(s => s.Id == upAppointment.Id).FirstOrDefaultAsync();
        if (existingLog == null) {
            return NotFound("Log not found");
        }
        
        await _appointmentsCollection.ReplaceOneAsync(s => s.Id == upAppointment.Id, upAppointment);

        return Ok(upAppointment);
    }
    
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpDelete]
    public async Task<IActionResult> DeleteFile(string fileName) {

        var logToDelete = await _appointmentsCollection.Find(s => s.Id == id).FirstOrDefaultAsync();
        if (logToDelete == null) {
            return BadRequest("Appointment does not exist");
        }
        
        await _appointmentsCollection.DeleteOneAsync(s => s.Id == id);
        return NoContent();
    }

}