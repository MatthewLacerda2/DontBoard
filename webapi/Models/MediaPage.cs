namespace Server.Models;

public class MediaPage {

    public DateTime createdDate, lastChangedDate;
    public string name;

    public List<MediaFile> files{
        get;
        private set;
    }

    public MediaPage(string _name){
        name = _name;
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

    public bool UpdateMediaFile(MediaFileDTO mediaFile){

        MediaFile mfToUpdate = files.Find(m=>m.Name == mediaFile.Name)!;
        if(mfToUpdate==null){
            return false;
        }

        mfToUpdate.positionX = mediaFile.positionX;
        mfToUpdate.positionY = mediaFile.positionY;
        
        lastChangedDate=DateTime.Now;
        return true;
    }
}