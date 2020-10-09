import icon_doc from "../additions/icon_doc.png";
import icon_jpg from "../additions/icon_jpg.png";
import icon_pdf from "../additions/icon_pdf.png";
import icon_png from "../additions/icon_png.png";
import icon_txt from "../additions/icon_txt.png";
import icon_xls from "../additions/icon_xls.png";

const fileExtentionRead = (name) => {
    const allowedExtention = name.match(
      /(\.doc|\.docx|\.jpg|\.jpeg|\.png|\.xls|\.xlsx|\.pdf|\.txt)$/i
    );
    let fileExtention = 1;
    !allowedExtention
      ? (fileExtention = 1)
      : (fileExtention = allowedExtention[0]);

    switch (fileExtention) {
      case ".doc":
        return icon_doc;
      case ".docx":
        return icon_doc;
      case ".jpg":
        return icon_jpg;
      case ".jpeg":
        return icon_jpg;
      case ".png":
        return icon_png;
      case ".xls":
        return icon_xls;
      case ".xlsx":
        return icon_xls;
      case ".pdf":
        return icon_pdf;
      case ".txt":
        return icon_txt;
      default:
        return icon_doc;
    }
  };

  export default fileExtentionRead;