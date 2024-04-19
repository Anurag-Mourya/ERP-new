import React from 'react'
import './successmessages.scss'

const SuccessMessage = ({valueofmessage}) => {
  return (
    <>
      <div className="main-success01">
	<div className="check-container">
		<div className="check-background">
			<svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
		<div className="check-shadow"></div>
	</div>

    <h2>{valueofmessage}</h2>
</div>
    </>
  )
}

export default SuccessMessage
