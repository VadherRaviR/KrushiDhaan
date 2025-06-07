module.exports.getform=(req, res) => res.render("form");
module.exports.formdata= async (req, res) => {
    const { filename, path: url } = req.file;
    const newFarmer = new Farmer();
    const data = req.body.farmer;
    newFarmer.FullName = data.FullName;
    newFarmer.Email = data.Email;
    newFarmer.MobileNmber = data.MobileNmber;
    newFarmer.Address = [
      { State: data.State, District: data.District, Taluka: data.Taluka },
    ];
    newFarmer.ProfileImage = { url, filename };
    await newFarmer.save();
    res.redirect("/home");
  };
