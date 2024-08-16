import nodemailer from 'nodemailer'
import mustache from 'mustache'

const Gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'simantan228@gmail.com',
    pass: 'jime gqmx perg mtou'
  }
})

const mailOptions = {
  from: 'simantan228@gmail.com'
}

const sendMailMeetCreated = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> New Meeting </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> You have been invited to join a meeting </h4> </td> </tr> <!-- meeting detaill --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{title}} </span> </h3> </td> </tr> <!-- tanggal dan jam --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{meetDate}}, {{starttime}} - {{endtime}} </span> </h2> </td> </tr> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> to join the meeting, click the button below </p> </td> </tr> </tbody> </table> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"> <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton">  </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2024 Simantan app </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'
  const correctedUrl = payload.undanganPath.replace(/\\/g, '/')

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: `${payload.undanganNama}`,
        path: `${process.env.BASE_URL}/upload/${correctedUrl}`,
        cid: 'simantan228@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailMeetTolak = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Meeting Rejected </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> The meeting you proposed has been rejected </h4> </td> </tr> <!-- meeting detaill --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{title}} </span> </h3> </td> </tr> <!-- tanggal dan jam --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{meetDate}}, {{starttime}} - {{endtime}} </span> </h2> </td> </tr> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">  </p> </td> </tr> </tbody> </table> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"> <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton">  </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2024 Simantan app </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'
  // const correctedUrl = payload.undanganPath.replace(/\\/g, '/')

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     filename: `${payload.undanganNama}`,
    //     path: `${process.env.BASE_URL}/${correctedUrl}`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailMeetTerima = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Meeting Accepted </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> The meeting you proposed has been accepted </h4> </td> </tr> <!-- meeting detaill --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{title}} </span> </h3> </td> </tr> <!-- tanggal dan jam --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{meetDate}}, {{starttime}} - {{endtime}} </span> </h2> </td> </tr> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> </p> </td> </tr> </tbody> </table> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"> <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton">  </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2024 Simantan app </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'
  // const correctedUrl = payload.undanganPath.replace(/\\/g, '/')

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     filename: `${payload.undanganNama}`,
    //     path: `${process.env.BASE_URL}/${correctedUrl}`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMail = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> New Meeting </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> You have been invited to join a meeting </h4> </td> </tr> <!-- meeting detaill --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{title}} </span> </h3> </td> </tr> <!-- tanggal dan jam --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{meetDate}}, {{starttime}} - {{endtime}} </span> </h2> </td> </tr> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> di : {{link}} </p> </td> </tr> </tbody> </table> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"> <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2022 Simantan app </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.jpg',
        path: `${process.env.BASE_URL}/images/logo.jpg`,
        cid: 'simantan228@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailVerifikator = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><!-- © 2018 Shift Technologies. All rights reserved. --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right: 10px; padding-left: 10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width: 600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color: #fff; border-color: #e5e5e5; border-style: solid; border-width: 0 1px 1px 1px;"><tbody><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"></table></td></tr><tr><td style="padding-bottom: 20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration: none" target="_blank"><img alt="" border="0" src="{{logo}}" style="width: 30%; max-width: 600px; height: auto; display: block; color: #f9f9f9" width="0" /></a></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span> Tugas Baru </span></h4></td></tr><tr><td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color: #999; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Ada dokumen pencairan yang harus diverivikasi</h4></td></tr><!-- meeting detail --><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h3 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span> {{title}} </span></h3></td></tr><!-- Nama Kegiatan --><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>  </span></h4></td></tr><!-- <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Description </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 20px; padding-left: 80px; padding-right: 80px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> {{description}} </h4> </td> </tr> --><!-- attachment --><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"><tbody><tr><td style="padding-top: 20px; padding-bottom: 20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color: #eb891b; padding: 12px 35px; border-radius: 50px" align="center" class="ctaButton"><a href="{{link}}" style="color: #fff; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" target="_blank" class="text">Lihat Detail</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px" height="20">&nbsp;</td></tr><tr><!-- simple footer copyright --><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"><tbody><tr><td style="padding-bottom: 20px" align="center" valign="top" class="description"><p class="text" style="color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; font-style: normal; letter-spacing: normal; line-height: 22px; text-transform: none; text-align: center; padding: 0; margin: 0;">© 2024 SIMANTAN</p></td></tr></tbody></table></td></tr><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     // filename: 'logo.jpg',
    //     // path: `${process.env.BASE_URL}/images/logo.jpg`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailPJK = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><!-- © 2018 Shift Technologies. All rights reserved. --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right: 10px; padding-left: 10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width: 600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color: #fff; border-color: #e5e5e5; border-style: solid; border-width: 0 1px 1px 1px;"><tbody><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"></table></td></tr><tr><td style="padding-bottom: 20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration: none" target="_blank"><img alt="" border="0" src="{{logo}}" style="width: 30%; max-width: 600px; height: auto; display: block; color: #f9f9f9" width="0" /></a></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span> Tugas Baru </span></h4></td></tr><tr><td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color: #999; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Ada dokumen pencairan yang harus disiapkan</h4></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h3 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span> {{title}} </span></h3></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>  </span></h4></td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"><tbody><tr><td style="padding-top: 20px; padding-bottom: 20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color: #eb891b; padding: 12px 35px; border-radius: 50px" align="center" class="ctaButton"><a href="{{link}}" style="color: #fff; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" target="_blank" class="text">Lihat Detail</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px" height="20">&nbsp;</td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"><tbody><tr><td style="padding-bottom: 20px" align="center" valign="top" class="description"><p class="text" style="color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; font-style: normal; letter-spacing: normal; line-height: 22px; text-transform: none; text-align: center; padding: 0; margin: 0;">© 2024 SIMANTAN</p></td></tr></tbody></table></td></tr><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     // filename: 'logo.jpg',
    //     // path: `${process.env.BASE_URL}/images/logo.jpg`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailProgressPJK = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><!-- © 2018 Shift Technologies. All rights reserved. --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right: 10px; padding-left: 10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width: 600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color: #fff; border-color: #e5e5e5; border-style: solid; border-width: 0 1px 1px 1px;"><tbody><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"></table></td></tr><tr><td style="padding-bottom: 20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration: none" target="_blank"><img alt="" border="0" src="{{logo}}" style="width: 30%; max-width: 600px; height: auto; display: block; color: #f9f9f9" width="0" /></a></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span> Progress Pencairan Kegiatan {{kegiatan}}</span></h4></td></tr><tr><td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color: #999; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Proses pencairan sudah sampai di tahap {{tahap}}</h4></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h3 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>  </span></h3></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>  </span></h4></td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"><tbody><tr><td style="padding-top: 20px; padding-bottom: 20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color: #eb891b; padding: 12px 35px; border-radius: 50px" align="center" class="ctaButton"><a href="{{link}}" style="color: #fff; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" target="_blank" class="text">Lihat Detail</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px" height="20">&nbsp;</td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"><tbody><tr><td style="padding-bottom: 20px" align="center" valign="top" class="description"><p class="text" style="color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; font-style: normal; letter-spacing: normal; line-height: 22px; text-transform: none; text-align: center; padding: 0; margin: 0;">© 2024 SIMANTAN</p></td></tr></tbody></table></td></tr><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     // filename: 'logo.jpg',
    //     // path: `${process.env.BASE_URL}/images/logo.jpg`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailPerbaikiPJK = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><!-- © 2018 Shift Technologies. All rights reserved. --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right: 10px; padding-left: 10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width: 600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color: #fff; border-color: #e5e5e5; border-style: solid; border-width: 0 1px 1px 1px;"><tbody><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"></table></td></tr><tr><td style="padding-bottom: 20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration: none" target="_blank"><img alt="" border="0" src="{{logo}}" style="width: 30%; max-width: 600px; height: auto; display: block; color: #f9f9f9" width="0" /></a></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>Terdapat Kesalahan Dokumen</span></h4></td></tr><tr><td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color: #999; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">{{pesan}}</h4></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h3 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>{{title}}</span></h3></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span></span></h4></td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"><tbody><tr><td style="padding-top: 20px; padding-bottom: 20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color: #eb891b; padding: 12px 35px; border-radius: 50px" align="center" class="ctaButton"><a href="{{link}}" style="color: #fff; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" target="_blank" class="text">Lihat Detail</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px" height="20">&nbsp;</td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"><tbody><tr><td style="padding-bottom: 20px" align="center" valign="top" class="description"><p class="text" style="color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; font-style: normal; letter-spacing: normal; line-height: 22px; text-transform: none; text-align: center; padding: 0; margin: 0;">© 2024 SIMANTAN</p></td></tr></tbody></table></td></tr><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>'
  // payload.logo = 'cid:simantan228@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     // filename: 'logo.jpg',
    //     // path: `${process.env.BASE_URL}/images/logo.jpg`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailPPSPM = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right: 10px; padding-left: 10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width: 600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color: #fff; border-color: #e5e5e5; border-style: solid; border-width: 0 1px 1px 1px;"><tbody><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"></table></td></tr><tr><td style="padding-bottom: 20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration: none" target="_blank"><img alt="" border="0" src="{{logo}}" style="width: 30%; max-width: 600px; height: auto; display: block; color: #f9f9f9" width="0" /></a></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>Tugas Baru</span></h4></td></tr><tr><td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color: #999; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Ada surat perintah membayar (SPM) baru yang perlu dibuat</h4></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h3 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>{{title}}</span></h3></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span></span></h4></td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"><tbody><tr><td style="padding-top: 20px; padding-bottom: 20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color: #eb891b; padding: 12px 35px; border-radius: 50px" align="center" class="ctaButton"><a href="{{link}}" style="color: #fff; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" target="_blank" class="text">Lihat Detail</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px" height="20">&nbsp;</td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"><tbody><tr><td style="padding-bottom: 20px" align="center" valign="top" class="description"><p class="text" style="color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; font-style: normal; letter-spacing: normal; line-height: 22px; text-transform: none; text-align: center; padding: 0; margin: 0;">© 2024 SIMANTAN</p></td></tr></tbody></table></td></tr><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     // filename: 'logo.jpg',
    //     // path: `${process.env.BASE_URL}/images/logo.jpg`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailBendahara = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><!-- © 2018 Shift Technologies. All rights reserved. --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right: 10px; padding-left: 10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width: 600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color: #fff; border-color: #e5e5e5; border-style: solid; border-width: 0 1px 1px 1px;"><tbody><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"></table></td></tr><tr><td style="padding-bottom: 20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration: none" target="_blank"><img alt="" border="0" src="{{logo}}" style="width: 30%; max-width: 600px; height: auto; display: block; color: #f9f9f9" width="0" /></a></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>Tugas Baru</span></h4></td></tr><tr><td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color: #999; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Ada kegiatan yang perlu pencairan honor</h4></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h3 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span>{{title}}</span></h3></td></tr><tr><td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px" align="center" valign="top" class="mainTitle"><h4 class="text" style="color: #000; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;"><span></span></h4></td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"><tbody><tr><td style="padding-top: 20px; padding-bottom: 20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color: #eb891b; padding: 12px 35px; border-radius: 50px" align="center" class="ctaButton"><a href="{{link}}" style="color: #fff; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" target="_blank" class="text">Lihat Detail</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px" height="20">&nbsp;</td></tr><tr><td style="padding-left: 20px; padding-right: 20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"><tbody><tr><td style="padding-bottom: 20px" align="center" valign="top" class="description"><p class="text" style="color: #666; font-family: "Open Sans", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; font-style: normal; letter-spacing: normal; line-height: 22px; text-transform: none; text-align: center; padding: 0; margin: 0;">© 2024 SIMANTAN</p></td></tr></tbody></table></td></tr><tr><td style="background-color: #eb891b; font-size: 1px; line-height: 3px" class="topBorder" height="3">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>'

  // payload.logo = 'cid:simantan228@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload })
    // attachments: [
    //   {
    //     // filename: 'logo.jpg',
    //     // path: `${process.env.BASE_URL}/images/logo.jpg`,
    //     cid: 'simantan228@gmail.com'
    //   }
    // ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export {
  sendMailMeetCreated,
  sendMail,
  sendMailPJK,
  sendMailProgressPJK,
  sendMailPerbaikiPJK,
  sendMailVerifikator,
  sendMailPPSPM,
  sendMailBendahara,
  sendMailMeetTerima,
  sendMailMeetTolak,
  Gmail,
  mailOptions
}
