// import React from 'react';
// import { Tooltip } from 'react-tooltip'; 

// const Test = () => {
//   return (
//     <div>


//       <h1 data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">dsfdsfd</h1>









//       <Tooltip id="my-tooltip" className="extraclassoftooltip"/>
//     </div>
//   );
// }

// export default Test;




// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';

// function Test() {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <motion.form 
//       onSubmit={handleSubmit(onSubmit)}
//       initial={{ opacity: 0, y: -100 }} // Initial animation state
//       animate={{ opacity: 1, y: 0 }} // Animation when form is rendered
//       exit={{ opacity: 0, y: 100 }} // Animation when form is removed
//     >
//       <motion.input
//         {...register("firstName", { required: true })}
//         initial={{ x: -100, opacity: 0 }} // Initial animation state for input
//         animate={{ x: 0, opacity: 1 }} // Animation when input is rendered
//         transition={{ delay: 0.2 }} // Delay the animation
//       />
//       {errors.firstName && <span>This field is required</span>}

//       <motion.input
//         {...register("lastName", { required: true })}
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       />
//       {errors.lastName && <span>This field is required</span>}

//       <motion.input
//         {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//       />
//       {errors.email && <span>Please enter a valid email address</span>}

//       <motion.button
//         type="submit"
//         whileHover={{ scale: 1.1 }} // Animation when hovering over the button
//         whileTap={{ scale: 0.9 }} // Animation when the button is pressed
//       >
//         Submit
//       </motion.button>
//     </motion.form>
//   );
// }

// export default Test;


// import React from 'react';

// const Test = () => {
//   const jsonStr = 

//   '[{\"id\":12,\"field_name\":\"enter new name\",\"value\":\"101\"},{\"id\":13,\"field_name\":\"enter new text area\",\"value\":\"101\"},{\"id\":15,\"field_name\":\"enter units1\",\"value\":\"kg\"},{\"id\":16,\"field_name\":\"enter units1\",\"value\":\"kg\"},{\"id\":17,\"field_name\":\"enter units1\",\"value\":\"kg\"},{\"id\":18,\"field_name\":\"enter units1\",\"value\":\"kg\"},{\"id\":19,\"field_name\":\"enter category name\",\"value\":\"cat2\"}]'


//   ;

//   const jsonArr = JSON.parse(jsonStr);

//   const decodedJson = jsonArr.map(item => ({
//     [item.id]: item.id,
//     [item.field_name]: item.value
//   }));

//   return (
//     <div>
//       <pre>{JSON.stringify(decodedJson, null, 2)}</pre>
//     </div>
//   );
// };



// export default Test


import React, { useEffect, useState } from 'react';

const test = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        event.preventDefault(); // Some browsers require this line
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]);
  return (
    <div>
      <h1>My Component</h1>
      <p>Try to leave or reload this page to see the alert if there are unsaved changes.</p>
      <input
        type="text"
        onChange={() => setIsFormDirty(true)}
        placeholder="Type something to make the form dirty"
      />
    </div>
  )
}

export default test
