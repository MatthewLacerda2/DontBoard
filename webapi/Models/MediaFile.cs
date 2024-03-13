namespace Server.Models;

public class MediaFile {

    public mediaFileType fileType;
    public string src;
    public string name;
    public string type;
    public int positionX, positionY;

    public MediaFile(mediaFileType _fileType, string _src, string _name, string _type, int x, int y){
        fileType = _fileType;
        src = _src;
        name = _name;
        type = _type;
        positionX = x;
        positionY = y;
    }
}