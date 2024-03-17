namespace Server.Models;

public class MediaFileDTO {

    public MediaFileType fileType;
    public readonly Guid Id;
    public string type;
    public string name;
    public int positionX, positionY;

    public MediaFileDTO(MediaFileType _fileType, string _type, string _name, int x, int y){
        Id = Guid.NewGuid();
        fileType = _fileType;
        type = _type;
        name = _name;
        positionX = x;
        positionY = y;
    }
}