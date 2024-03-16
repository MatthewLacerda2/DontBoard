namespace Server.Models;

public class MediaPage {

    public Guid Id;
    public DateTime createdDate, lastChangedDate;

    public List<MediaFile> files{
        get;
        private set;
    }

    public MediaPage(){
        Id = Guid.NewGuid();
        files = new List<MediaFile>();
        createdDate = DateTime.Now;
        lastChangedDate = DateTime.Now;
    }

    public void AddMediaFile(MediaFile mediaFile){

        if(files==null){
            files = new List<MediaFile>();
        }

        files.Add(mediaFile);
        lastChangedDate = DateTime.UtcNow;

    }

    public void RemoveMediaFile(MediaFile mediaFile){
        files.Remove(mediaFile);
        lastChangedDate = DateTime.UtcNow;
    }
}