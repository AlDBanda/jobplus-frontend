import React from 'react'
import './Alert.scss';

export default function Alert({  data: {message, details=[], type='error' }}) {
  if (!message) return null;

  return (
    <div className={`alert alert--${type}`}>
      <p className="alert__message">{message}</p>
      <ul className="alert__details">
        {details?.map((detail, index) => (
        <li className={index}>{detail.message}</li>
        ))}
      </ul>
    </div>
  )
}
