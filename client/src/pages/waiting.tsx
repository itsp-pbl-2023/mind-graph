// import React from 'react';
import React from 'react';

const Waiting: FC = () => {
  return (
    <div>
      <hgroup>
        <h1>Waiting</h1>
      </hgroup>

      <form>
        <div>
          <p>input theme</p>
        </div>
        <div>
          {/* <textarea></textarea> */}
          {/* <TextareaComp name="TextareaComp" value={state.comment} /> */}
        </div>
        <div>
          <input type="text" required minlength="1" maxlength="32" size="32"/>
          {/* <InputComp name="InputComp" value={state.comment} /> */}
        </div>
        <div>
          <button>send</button>
        </div>
      </form>
    </div>   
  )
}

export default Waiting
  