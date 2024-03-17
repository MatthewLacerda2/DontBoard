using Microsoft.AspNetCore.Mvc;
using Server.Models;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace webserver.Controllers;

/// <summary>
/// Controller class handling PageMedia and MediaFiles
/// 
/// C.reate: post a media_file. If it's page doesnt exist, create it
/// R.ead: read a page's media files
/// U.pdate: change a media_files's properties
/// D.elete: delete a media_file. If it's page is now empty, delete the page
/// 
/// </summary>
[ApiController]
[Route("api/v1/medias")]
[Produces("application/json")]
public class MediaController : ControllerBase {

    private readonly IMongoCollection<MediaPage> _PageMediaCollection;

    /// <summary>
    /// Controller class for Appointment CRUD requests
    /// </summary>
    public MediaController(IMongoClient mongoClient) {
        _PageMediaCollection = mongoClient.GetDatabase("mongo_db").GetCollection<MediaPage>("PageMedia");
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(MediaPage[]))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet("{id}")]
    public async Task<IActionResult> ReadPage(Guid id) {
        
        var _pagemedia = await _PageMediaCollection.Find(s => s.Id == id).FirstOrDefaultAsync();

        if(_pagemedia==null) {
            return NotFound("Page not found");
        }

        _pagemedia.lastChangedDate = DateTime.Now;

        var response = JsonConvert.SerializeObject(_pagemedia.files);
        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(MediaFile))]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [HttpPost]
    public async Task<IActionResult> CreateFile(Guid id, [FromBody] MediaFile newMedia) {

        var _pagemedia = await _PageMediaCollection.Find(s=>s.Id == id).FirstOrDefaultAsync();

        if(_pagemedia==null) {
            _pagemedia = new MediaPage();
            _pagemedia.files.Add(newMedia);
            _PageMediaCollection.InsertOne(_pagemedia);
        }
        
        if(_pagemedia.files.Count > 31){
            return Forbid("Maximum files count reached");
        }

        _pagemedia.AddMediaFile(newMedia);

        var filter = Builders<MediaPage>.Filter.Eq(s => s.Id, _pagemedia.Id);
        var update = Builders<MediaPage>.Update.Set(s => s.files, _pagemedia.files);
        _PageMediaCollection.UpdateOne(filter, update);

        return CreatedAtAction(nameof(CreateFile), newMedia);
    }
    
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(MediaFile))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
    [HttpPut]
    public async Task<IActionResult> UpdateFile(Guid id, [FromBody] MediaFile updateMedia) {

        var existingPage = await _PageMediaCollection.Find(s=>s.Id == id).FirstOrDefaultAsync();
        if (existingPage == null) {
            return BadRequest("Page not found");
        }

        bool wasFileUpdate = existingPage.UpdateMediaFile(updateMedia);

        if(wasFileUpdate){
            return Ok(updateMedia);
        }else{
            return BadRequest("Media not found");
        }
    }
    
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpDelete]
    public async Task<IActionResult> DeleteFile(Guid id, MediaFile mediaFile) {

        var existingPage = await _PageMediaCollection.Find(s=>s.Id == id).FirstOrDefaultAsync();
        if (existingPage == null) {
            return BadRequest("Page not found");
        }

        bool wasDelete = existingPage.RemoveMediaFile(mediaFile);

        if(existingPage.files.Count == 0){
            _PageMediaCollection.DeleteOne(p => p.Id == id);
        }

        if(wasDelete){
            return NoContent();
        }else{
            return BadRequest("Page not found");
        }
    }
}