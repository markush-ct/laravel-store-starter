import React from 'react'

const AlertMessage = ({message="Default alert message.", type}) => {
    const style = {
        success: 'border-2 border-dashed border-green-600 text-green-600 p-5 text-center',
        danger: 'border-2 border-dashed border-red-600 text-red-600 p-5 text-center',
    }[type]

    return (
        <div className={style}>
            {message.success ?? message.error ?? message}
        </div>
    )
}

export default AlertMessage
