namespace Server.Models;

public class MediaFile {

    public string url;
    public int positionX, positionY;

    //public int layer;
    //public int rotation;
    //public float scale;

    public MediaFile(string _url){
        url=_url;
    }

    public MediaFile(string _url, int x, int y){
        url=_url;
        positionX=x;
        positionY=y;
    }
}