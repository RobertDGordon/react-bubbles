import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [colorsChanged, setColorsChanged ] = useState([])
  
  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        console.log('loading',res.data)
        setColorList(res.data)
      })
      .catch(err => console.log(err))
  },[colorsChanged])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorsChanged} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
