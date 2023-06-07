import "../styles/newartist.css";
import React, { useState } from "react";

const NewArtist = ({ closeModal, onSubmit, defaultValue }) =>{
  const [formState, setFormState] = useState(
    defaultValue || {
    id: "",
    artistName: "",
    artistImage: "",
    followers:"0",
    }
  );
  
  const [errors, setErrors] = useState("");
  const validateForm = () => {
    if (formState.id && formState. artistName && formState.artistImage) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };
  return (
    <div className="newArtist" 
    onClick={(e) => {
      if (e.target.className === "modal-container") closeModal();
    }}>
      <h1 className="newArtistTitle">Thêm nghệ sĩ mới</h1>
      <form className="newArtistForm">
        <div className="newArtistItem">
          <label htmlFor="artistName">Tên nghệ sĩ</label>
          <input type="text" placeholder="" onChange={handleChange} value={formState.artistName} />
        </div>
        <div className="newArtistItem">
          <label>Giới thiệu</label>
          <input type="text" placeholder="" />
        </div>
        <div class="newArtistLink">
          <label asp-for="artistImage" htmlFor="artistImage" class="control-label">Ảnh nghệ sĩ</label>
          <input hidden asp-for="artistImage"  type="text" value="anh" id="linkanhNS" name="ANHNS" />
          <input type="file" id="linkimage" onChange={handleChange} value={formState.artistImage}/>
          <span asp-validation-for="artistImage" class="text-danger"></span>
        </div>
      {/* <div className="newArtistItem">
        <label>Gender</label>
        <div className="newArtistGender">
          <input type="radio" name="gender" id="male" value="male" />
          <label for="male">Male</label>
          <input type="radio" name="gender" id="female" value="female" />
          <label for="female">Female</label>
          <input type="radio" name="gender" id="other" value="other" />
          <label for="other">Other</label>
        </div>
      </div>  */}
        {errors && <div className="error">{`Please include: ${errors}`}</div>}  
        <button className="newArtistButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
/*
const NewArtist= () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box m="20px">
      <Header title="CREATE ARTIST" subtitle="Create a New Artist" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="firstName"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <ImageField
                fullWidth
                variant="filled"
                type="image"
                label="Image"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.image}
                name="image"
                error={!!touched.image && !!errors.image}
                helperText={touched.image && errors.image}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  image: Yup.mixed()
                .required("You need to provide a file")
                .test("fileSize", "The file is too large", (value) => {
                    return value && value[0].sienter <= 2000000;
                })
                .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
                    return value && (
                        value[0].type === "image/jpeg" ||
                        value[0].type === "image/bmp" ||
                        value[0].type === "image/png" ||
                        value[0].type === 'application/pdf' ||
                        value[0].type === "application/msword"
                    );
                }),
});
const initialValues = {
  name: "",
  image:"",
};
*/
export default NewArtist


