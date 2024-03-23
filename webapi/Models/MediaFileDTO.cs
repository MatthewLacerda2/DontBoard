namespace Server.Models;

public class MediaFileDTO {

    public MediaFileType fileType;
    public string type;
    public string Name;
    public int positionX, positionY;

    public MediaFileDTO(MediaFileType _fileType, string _type, string _name, int x, int y){
        fileType = _fileType;
        type = _type;
        Name = _name;
        positionX = x;
        positionY = y;
    }
}