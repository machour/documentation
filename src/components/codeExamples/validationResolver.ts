export default `import * as React from "react";
import { useForm } from "react-hook-form";
import * as Joi from "joi";

const validationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    context: "context",
    resolver: async (data, context) => {
      const { error, value: values } = validationSchema.validate(data, {
        abortEarly: false,
      });

      if (!error) return { values: values, errors: {} };

      return {
        values: {},
        errors: error.details.reduce(
          (previous, currentError) => ({
            ...previous,
            [currentError.path[0]]: currentError,
          }),
          {},
        ),
      };
    },
  });

  const onSubmit = data => {
    console.log(data)
  };

  return (
    <div className="App">
      <h1>resolver</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register("username")} />
        {errors.username && <p>errors.username.message</p>}
        <input type="submit" />
      </form>
    </div>
  );
};
`
