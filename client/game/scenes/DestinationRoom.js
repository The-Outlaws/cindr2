import Phaser from 'phaser';
// import Avatar from '../sprites/Avatar';
import store from '../../store';
// import { getActiveUsers } from '../../store/reducers/room';

const fontStyleQuestion = {
  font: '6em Indie Flower',
  fill: 'tomato',
  align: 'center'
};
const avatarStr = 'avatar';
export default class DestinationRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'DestinationRoom' });
    this.displayUser = this.displayUser.bind(this);
    this.hover = this.hover.bind(this);
    this.restState = this.restState.bind(this);
  }
  init() {
    this.playerSpeed = 10;
    this.avatarPlacement = {
      x: this.game.config.width / 5 * 3,
      y: this.game.config.height / 2 - 50
    };
    this.avatarLoad = 0;
  }
  preload() {
    const { user: { avatar }, room } = store.getState();
    this.load.image(avatarStr, avatar);
    this.load.image('troll', '/troll128.png');
    this.load.image('mushroom', '/MushroomScene.png');
    room.forEach((rm, idx) => {
      return this.load.image(`avatar${idx}`, rm.avatar);
      // this.avatarLoad ++
    });
    room.forEach((rm, idx) => {
      return this.load.image(`photo${idx}`, rm.photo);
      // this.avatarLoad ++
    });
  }
  create() {
    const { user: { id }, room } = store.getState();
    console.log(room);
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'mushroom'
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(
      this.bg.displayWidth / 3,
      0.1 * this.bg.displayHeight / 4,
      'Meet some new friends!',
      fontStyleQuestion
    );

    room.map((rm, idx) => {
      console.log(rm);
      const avatarString = `avatar${idx}`;
      const photoString = `photo${idx}`;
      const userData = {
        x: this.avatarPlacement.x,
        y: this.avatarPlacement.y,
        age: rm.age,
        name: rm.firstName,
        gender: rm.gender,
        height: rm.height,
        photo: photoString,
        orientation: rm.orientation
      };

      this.add
        .image(this.avatarPlacement.x, this.avatarPlacement.y, avatarString)
        .setInteractive()
        .on('pointerdown', () => this.displayUser(userData))
        .on('pointerup', () => {});
      this.avatarPlacement.x += 100;
    });
    // for (let i = 0; i <= this.avatarLoad; i++) {
    //   const avatarString = `userAvatar${i}`
    //   console.log(typeof this.textures.list)
    //   this.add.image(this.avatarPlacement.x, this.avatarPlacement.y, avatarString)
    //           .setInteractive()
    //           .on('pointerdown', () => this.displayUser())
    //   this.avatarPlacement.x += 40
    //   this.avatarPlacement.y += 40
    //   if (i === this.avatarLoad) {
    //     this.avatarLoad = 0
    //   }
    // }
    // room.forEach((rm) => {
    //   this.add.image(rm.avatar, this.avatarPlacement.x, this.avatarPlacement.y)
    //   this.avatarPlacement.x += 20
    //   this.avatarPlacement.y += 20
    // })
    this.avatar = this.physics.add.sprite(
      0.15 * this.bg.displayWidth / 4,
      2 * this.bg.displayHeight / 4,
      avatarStr
    );
    this.avatar.body.setAllowGravity(false);
    this.avatar.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.left.isDown) {
      if (this.cursors.up.isDown) this.avatar.y -= this.playerSpeed;
      else if (this.cursors.down.isDown) this.avatar.y += this.playerSpeed;
      this.avatar.x -= this.playerSpeed;
    }
    if (this.cursors.right.isDown) {
      if (this.cursors.up.isDown) this.avatar.y -= this.playerSpeed;
      else if (this.cursors.down.isDown) this.avatar.y += this.playerSpeed;
      this.avatar.x += this.playerSpeed;
    }
    if (this.cursors.up.isDown) {
      if (this.cursors.left.isDown) this.avatar.x -= this.playerSpeed;
      else if (this.cursors.right.isDown) this.avatar.x += this.playerSpeed;
      this.avatar.y -= this.playerSpeed;
    }
    if (this.cursors.down.isDown) {
      if (this.cursors.left.isDown) this.avatar.x -= this.playerSpeed;
      else if (this.cursors.right.isDown) this.avatar.x += this.playerSpeed;
      this.avatar.y += this.playerSpeed;
    }
  }
  displayUser(userData) {
    // accept user image, name, age, gender, orientation, y coord, x coord
    // image: profile image
    // text: name, age, gender, orientation
    // button: request to match
    //const profileCardInfo = [userData.image, userData.name, userData.age, userData.gender, userData.orientation]
    //const profileCard = new Container({x: userData.x, y: userData.y + 10, scene: this, children: profileCardInfo})
    console.log(userData);
    // const userName = this.add.text(0, 0, userData.name)
    // const profileCard = this.add.container(userData.x, userData.y - 10, this, [userName]);
    //const rect = new Phaser.GameObjects.Rectangle({x: userData.x, y: userData.y - 270, width: 220, height: 400, colorFill: '0xF0F0F0'})
    //const rect = new Phaser.GameObjects.Rectangle (this, userData.x, userData.y - 270, 220, 400, '0xF0F0F0')
    // preUpdate(time, delta) {}
    const rect = this.add.rectangle(
      userData.x,
      userData.y - 270,
      250,
      400,
      '0xF0F0F0'
    );
    const photo = this.add.image(rect.x, rect.y - 100, userData.photo);
    const name = this.add.text(rect.x - 90, photo.y + 90, userData.name, {
      fill: 'black',
      font: '24px'
    });
    const age = this.add.text(name.x + 150, photo.y + 90, userData.age, {
      fill: 'black',
      font: '24px'
    });
    const gender = this.add.text(
      name.x,
      name.y + 30,
      `Gender: ${userData.gender}`,
      { fill: 'black', font: '20px' }
    );
    const orientation = this.add.text(
      name.x,
      gender.y + 30,
      `Likes ${userData.orientation}`,
      { fill: 'black', font: '20px' }
    );
    const height = this.add.text(
      name.x,
      orientation.y + 30,
      `Height ${userData.height}`,
      { fill: 'black', font: '20px' }
    );
    const requestToMatchButton = this.add
      .rectangle(rect.x, height.y + 50, 230, 35, '0xFFC300')
      .setInteractive()
      .on('pointerover', () => this.hover(this.requestToMatch))
      .on('pointerout', () => this.restState(this.requestToMatch));
    this.requestToMatch = this.add.text(
      name.x,
      requestToMatchButton.y - 10,
      'Request to Match',
      { fill: 'black', font: '20px' }
    );
    // .setInteractive()
    // .on('pointerover', () => this.hover(this.requestToMatch))
    const closeButton = this.add
      .rectangle(rect.x, requestToMatchButton.y + 40, 230, 35, '0xFFC300')
      .setInteractive()
      .on('pointerover', () => this.hover(this.close))
      .on('pointerout', () => this.restState(this.close))
      .on('pointerdown', () => this.closeWindow(window));
    this.close = this.add
      .text(name.x, closeButton.y - 10, 'Close', {
        fill: 'black',
        font: '20px'
      })
      .setInteractive()
      .on('pointerover', () => this.hover(this.close))
      .on('pointerdown', () => this.closeWindow(window));
    const window = [
      rect,
      photo,
      name,
      age,
      gender,
      orientation,
      height,
      requestToMatchButton,
      this.requestToMatch,
      closeButton,
      this.close
    ];
  }
  hover(button) {
    button.setStyle({ fill: '#FF5733' });
  }
  restState(button) {
    button.setStyle({ fill: 'black' });
  }
  closeWindow(window) {
    window.forEach(elem => {
      elem.destroy();
    });
  }
}
