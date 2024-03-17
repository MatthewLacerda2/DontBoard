namespace Server.Models;

public class MediaFile {

    public MediaFileType fileType;
    public readonly Guid Id;
    public string src;
    public string name;
    public int positionX, positionY;

    public MediaFile(MediaFileType _fileType, string _src, string _name, int x, int y){
        Id = Guid.NewGuid();
        fileType = _fileType;
        src = _src;
        name = _name;
        positionX = x;
        positionY = y;
    }
}