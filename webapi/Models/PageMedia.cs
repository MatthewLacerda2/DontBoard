namespace Server.Models;

public class PageMedia {

    public Guid Id;
    public List<MediaFile[]> files;

    public PageMedia(){
        Id = Guid.NewGuid();
        files = new List<MediaFile[]>();
    }
}