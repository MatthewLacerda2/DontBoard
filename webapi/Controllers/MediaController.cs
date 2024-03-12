using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Server.Models;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace webserver.Controllers;

/// <summary>
/// Controller class for MediaFile CRUD requests
/// </summary>
[ApiController]
[Route("api/v1/logs")]
[Produces("application/json")]
public class MediaController : ControllerBase {

    private readonly IMongoCollection<MediaFile> _PageMediaCollection;

    /// <summary>
    /// Controller class for Appointment Log CRUD requests
    /// </summary>
    public MediaController(IMongoClient mongoClient) {
        _PageMediaCollection = mongoClient.GetDatabase("mongo_db").GetCollection<MediaFile>("PageMedia");
    }

    //POST: post a media. if the page doesnt exist, create
    //READ: read a page
    //Update: change a files properties
    //Delete: delete a file. if the page is now empty, delete the page

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
            return BadRequest("Log Appointment does not exist");
        }
        
        await _appointmentsCollection.DeleteOneAsync(s => s.Id == id);
        return NoContent();
    }

}