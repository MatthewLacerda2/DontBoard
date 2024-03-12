namespace Server.Models;

public class PageMedia {

    public Guid id;
    public MediaFile[] files;

    public PageMedia(){
        id = Guid.NewGuid();
        files = new MediaFile[0];
    }

    public PageMedia(MediaFile[] _files){
        id = Guid.NewGuid();
        files = _files;
    }
}