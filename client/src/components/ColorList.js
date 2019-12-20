import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import { palette } from '@potion/color';

// const myPalette = palette({
//   'scheme': 'Blues'
// })

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);

  // console.log(myPalette)

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const generateRandomColors = () =>{
    let colors = []
    for(let i = 0; i < 1; i++){
        colors.push('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),) 
    }
    // console.log(colors)
    return colors
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // console.log(color.id)
  };

  const saveEdit = e => {
    e.preventDefault();
    // console.log(colorToEdit.id)
    if (colorToEdit.color !== '' && colorToEdit.code.hex !== ''){
          axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('***', res.data, 'put response')
        updateColors(colorToEdit)
        setEditing(false)
      })
      .catch(err => console.log(err))
    }

  };

  const deleteColor = color => {
    console.log('delete', color.id)
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log('*****', res.data, 'delete response')
        updateColors(color)
      })
      .catch(err => console.log(err))
  };

  const addRandom = e => {
    e.preventDefault()
    const randomColor = generateRandomColors()
    console.log (randomColor)
    setColorToEdit({
      ...colorToEdit, color: `${randomColor}`,
      code: { hex: `${randomColor}` }
    })
  }

  const addColor = e => {
    e.preventDefault()
    console.log('add', colorToEdit)
    if (colorToEdit.color !== '' && colorToEdit.code.hex !== ''){
      axiosWithAuth()
      .post(`/colors/`, colorToEdit)
      .then(res => {
        console.log('***', res.data, 'post response')
        updateColors(colorToEdit)
        setColorToEdit(initialColor)
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer">
      {!editing && (
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={addRandom}>random</button>
          </div>
        </form>
      )}
      </div>
    </div>
  );
};

export default ColorList;
