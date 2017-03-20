export class Comment {
  body: string;
  name: string;
  photo: string;

  constructor(commentInfo:any) {
    this.body = commentInfo.body;
    this.name = commentInfo.name;
    if(commentInfo.photo != null && commentInfo.photo != ""){
      this.photo = commentInfo.photo.url;
    }
  }
}
