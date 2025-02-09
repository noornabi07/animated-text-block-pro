import React from 'react';

const Content = ({ children }) => {
  return (
    <div>
      <main>
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Content;