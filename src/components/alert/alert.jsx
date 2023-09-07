import React from 'react'
import './Alert.scss';

export default function Alert({ type }) {
  return (
    <div className={`alert alert--${type}`}>
      <p className="alert__message">This is a message</p>
      <ul className="alert__details">
        <li className="alert__detail">This is detail 1</li>
        <li className="alert__detail">This is detail 2</li>
        <li className="alert__detail">This is detail 3</li>
      </ul>
    </div>
  )
}
