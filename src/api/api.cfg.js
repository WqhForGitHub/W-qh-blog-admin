const SERVER = 'http://localhost:3000'

export const statusCode= {
    OK: 200
}

export const apiURL = {
    BLOG: `${SERVER}`,
    BLOGLIST: `${SERVER}/find`,
    DELETEBLOG: `${SERVER}/Delete`,
    MODIFYBLOG: `${SERVER}/update`,
    INSERTBLOG: `${SERVER}/insert`,
    DELETETAG: `${SERVER}/DeleteTag`,
    FINDTAG: `${SERVER}/findTag`,
    ADDTAG: `${SERVER}/insertag`,
    FINDCLASSIFY: `${SERVER}/findClassify`,
    INSERTCLASSIFY: `${SERVER}/insertclassify`,
    PERSONALINFO: `${SERVER}/PerosnalInfo`,
    GETTOKEN: `${SERVER}/Login`
}