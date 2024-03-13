namespace Server.Models;

public class PageMedia {

    public Guid Id;
    public DateTime createdDate, lastChangedDate;

    public List<MediaFile> files{
        get;
        private set;
    }

    public PageMedia(){
        Id = Guid.NewGuid();
        files = new List<MediaFile>();
        createdDate = DateTime.Now;
    }

    public void AddMediaFile(MediaFile mediaFile){

        if(files==null){
            files = new List<MediaFile>();
        }
        files.Add(mediaFile);

        lastChangedDate = DateTime.UtcNow;

    }
}