import React from 'react';
import ImagePicker from 'react-image-picker';

const imageList = [
  '/centaur.png',
  '/fairy.png',
  '/dragon.png',
  '/goblin.png',
  '/hydra.png',
  '/loch-ness-monster.png',
  '/mermaid.png',
  '/narwhal.png',
  '/troll128.png'
];
const AvatarForm = props => {
  return (
    <ImagePicker
      images={imageList.map((image, i) => ({
        src: image,
        value: i
      }))}
      onPick={image => props.handleAvatar(image)}
    />
  );
};
export default AvatarForm;
