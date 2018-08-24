export default class Singer {
  constructor({id, name, avatar}) {
    this.id = id
    this.name = name
    if (avatar) {
      this.avatar = avatar
    } else {
      this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
    }
  }
}
