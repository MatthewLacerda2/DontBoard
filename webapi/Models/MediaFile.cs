namespace Server.Models;

public class MediaFile {

    public MediaFileType fileType;
    public readonly Guid Id;
    public string src;
    public string name;
    public string type;
    public int positionX, positionY;

    public MediaFile(MediaFileType _fileType, string _src, string _name, string _type, int x, int y){
        Id = Guid.NewGuid();
        fileType = _fileType;
        src = _src;
        name = _name;
        type = _type;
        positionX = x;
        positionY = y;
    }
}