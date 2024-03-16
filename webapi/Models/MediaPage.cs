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

    public bool RemoveMediaFile(MediaFile mediaFile){
        bool wasDelete = files.Remove(mediaFile);
        lastChangedDate = DateTime.UtcNow;

        return wasDelete;
    }

    public bool UpdateMediaFile(MediaFile mediaFile){

        MediaFile mfToUpdate = files.Find(m=>m.Id == mediaFile.Id);
        if(mfToUpdate==null){
            return false;
        }

        mfToUpdate = mediaFile;
        lastChangedDate=DateTime.Now;
        return true;
    }
}