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


import React from 'react'

const Test = () => {
  return (
    <div>
      
    </div>
  )
}

export default Test
