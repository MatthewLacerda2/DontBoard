namespace Server.Models;

public class MediaFile {

    public MediaFileType fileType;
    public string Src;
    public string Name;
    public int positionX, positionY;

    public MediaFile(MediaFileType _fileType, string _src, string _name, int x, int y){
        fileType = _fileType;
        Src = _src;
        Name = _name;
        positionX = x;
        positionY = y;
    }
}