const File=require('../model/file-model')

const create=async(req,res,next)=>{
    let fle=req.file;
    const createdfile=new File({
        filename:fle.filename,
        filepath:fle.path
    });
    try {
        await createdfile.save();
    } catch (err) {
        console.log(err);
        res.json({message: "Not Found"});
    }
    res.redirect("/vault")
}

const getfile = async (req, res, next) => {
    let file;
    try {
      file = await File.find({});
    } catch (err) {
        res.json({message: "Not Found"});
    }
    res.json({ fil: file.map((u) => u.toObject({ getters: true })) });
  };

exports.create=create;
exports.getfile=getfile;