namespace Server.Models;

public class PageMedia {

    public Guid Id;
    public MediaFile[] files;

    public PageMedia(){
        Id = Guid.NewGuid();
        files = new MediaFile[0];
    }
}