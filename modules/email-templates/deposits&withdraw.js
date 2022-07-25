const { transporter, Message } = require("../nodemailer");
const { compiler } = require("./components");
const declinedWithdraw = function (name, amount) {
  deleteme = " stop when you see this being edited"
  givethePelementsThiscolor = "#2f4b7a"
  let content = `
    <table
    class="es-content"
    cellspacing="0"
    cellpadding="0"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          class="es-content-body"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #ffffff;
            border-right: 1px solid #2f4b7a;
            border-left: 1px solid #2f4b7a;
            width: 600px;
          "
          cellspacing="0"
          cellpadding="0"
          bgcolor="#ffffff"
          align="center"
        >
          <tr>
            <td
              class="es-m-p10r es-m-p10l"
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 0;
                margin: 0;
                padding-left: 15px;
                padding-right: 15px;
                background-color: #ffffff;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 568px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 0;
                            margin: 0;
                            font-size: 0px;
                          "
                        >
                          <a
                            style="
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              text-decoration: underline;
                              color: #3d7781;
                              font-size: 14px;
                            "
                            ><img
                              src="https://www.temenosglobal.com/assets/email-images/cancel.png"
                              alt="Logo"
                              style="
                                display: block;
                                border: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                              "
                              width="70"
                              title="Logo"
                              height="70"
                          /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    class="es-m-p0r"
                    valign="top"
                    align="center"
                    style="padding: 0; margin: 0; width: 558px"
                  >
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          class="es-m-p15b es-m-p5r es-m-p5l"
                          style="
                            margin: 0;
                            padding-top: 10px;
                            padding-bottom: 20px;
                            padding-left: 30px;
                            padding-right: 30px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: arial, 'helvetica neue',
                                helvetica, sans-serif;
                              line-height: 21px;
                              color: #666666;
                              font-size: 14px;
                            "
                          >
                            <br />
                            <strong>Hi ${name} ,</strong
                            >&nbsp;,<br /><br />Your withdrawal
                            request of <strong>${amount} </strong
                            ><strong>USD</strong> was declined.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `;
  return compiler(content, "Declined Withdrawal Request");
};
const successfulWithdraw = function (name, amount, id) {
  let content = `
  <table
  class="es-content"
  cellspacing="0"
  cellpadding="0"
  align="center"
  style="
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    border-collapse: collapse;
    border-spacing: 0px;
    table-layout: fixed !important;
    width: 100%;
  "
>
  <tr>
    <td align="center" style="padding: 0; margin: 0">
      <table
        class="es-content-body"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          background-color: #ffffff;
          border-right: 1px solid #2f4b7a;
          border-left: 1px solid #2f4b7a;
          width: 600px;
        "
        cellspacing="0"
        cellpadding="0"
        bgcolor="#ffffff"
        align="center"
      >
        <tr>
          <td
            class="es-m-p10r es-m-p10l"
            align="left"
            bgcolor="#ffffff"
            style="
              padding: 0;
              margin: 0;
              padding-left: 15px;
              padding-right: 15px;
              background-color: #ffffff;
            "
          >
            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
              "
            >
              <tr>
                <td
                  align="left"
                  style="padding: 0; margin: 0; width: 568px"
                >
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                    "
                  >
                    <tr>
                      <td
                        align="center"
                        style="
                          padding: 0;
                          margin: 0;
                          font-size: 0px;
                        "
                      >
                        <a
                          style="
                            -webkit-text-size-adjust: none;
                            -ms-text-size-adjust: none;
                            mso-line-height-rule: exactly;
                            text-decoration: underline;
                            color: #3d7781;
                            font-size: 14px;
                          "
                          ><img
                            src="https://www.temenosglobal.com/assets/email-images/check.png"
                            alt="Logo"
                            style="
                              display: block;
                              border: 0;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                            "
                            width="70"
                            title="Logo"
                            height="70"
                        /></a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  class="es-m-p0r"
                  valign="top"
                  align="center"
                  style="padding: 0; margin: 0; width: 558px"
                >
                  <table
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        class="es-m-p15b es-m-p5r es-m-p5l"
                        style="
                          margin: 0;
                          padding-top: 10px;
                          padding-bottom: 20px;
                          padding-left: 30px;
                          padding-right: 30px;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            -webkit-text-size-adjust: none;
                            -ms-text-size-adjust: none;
                            mso-line-height-rule: exactly;
                            font-family: arial, 'helvetica neue',
                              helvetica, sans-serif;
                            line-height: 21px;
                            color: #666666;
                            font-size: 14px;
                          "
                        >
                          <strong>Hi ${name},
                          <br /><br />Your withdrawal
                          request of <strong>${amount} </strong
                          ><strong>USD</strong> has been approved
                          and will be sent to your wallet shortly
                          via <strong>Bitcoin.</strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        class="es-m-p25b es-m-p5r es-m-p5l"
                        style="
                          margin: 0;
                          padding-top: 10px;
                          padding-left: 30px;
                          padding-right: 30px;
                          padding-bottom: 40px;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            -webkit-text-size-adjust: none;
                            -ms-text-size-adjust: none;
                            mso-line-height-rule: exactly;
                            font-family: arial, 'helvetica neue',
                              helvetica, sans-serif;
                            line-height: 21px;
                            color: #666666;
                            font-size: 14px;
                          "
                        >
                          <strong
                            >Details of your withdrawal :</strong
                          ><br />Amount : ${amount} USD<br />Charge :
                          <span style="color: #ff0000">0 USD</span
                          ><br />paid via : Bitcoin.<br /><br /><br /><span
                            style="font-size: 12px"
                            >Transaction ID : ${id}</span
                          >
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
  `;
  return compiler(content, "Successful Withdrawal ");
};

const declinedDeposit = function (name, amount, id) {
  let content = `
    <table
    class="es-content"
    cellspacing="0"
    cellpadding="0"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          class="es-content-body"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #ffffff;
            border-right: 1px solid #2f4b7a;
            border-left: 1px solid #2f4b7a;
            width: 600px;
          "
          cellspacing="0"
          cellpadding="0"
          bgcolor="#ffffff"
          align="center"
        >
          <tr>
            <td
              class="es-m-p10r es-m-p10l"
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 0;
                margin: 0;
                padding-left: 15px;
                padding-right: 15px;
                background-color: #ffffff;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 568px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 0;
                            margin: 0;
                            font-size: 0px;
                          "
                        >
                          <a
                            style="
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              text-decoration: underline;
                              color: #3d7781;
                              font-size: 14px;
                            "
                            ><img
                              src="https://www.temenosglobal.com/assets/email-images/cancel.png"
                              alt="Logo"
                              style="
                                display: block;
                                border: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                              "
                              width="70"
                              title="Logo"
                              height="70"
                          /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    class="es-m-p0r"
                    valign="top"
                    align="center"
                    style="padding: 0; margin: 0; width: 558px"
                  >
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          class="es-m-p15b es-m-p5r es-m-p5l"
                          style="
                            margin: 0;
                            padding-top: 10px;
                            padding-bottom: 20px;
                            padding-left: 30px;
                            padding-right: 30px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: arial, 'helvetica neue',
                                helvetica, sans-serif;
                              line-height: 21px;
                              color: #666666;
                              font-size: 14px;
                            "
                          >
                            <strong>Hi ${name} ,</strong
                            >&nbsp;,<br /><br />Your deposit request
                            of <strong>${amount} </strong
                            ><strong>USD</strong> was declined.
                          
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          class="es-m-p25b es-m-p5r es-m-p5l"
                          style="
                            margin: 0;
                            padding-top: 10px;
                            padding-left: 30px;
                            padding-right: 30px;
                            padding-bottom: 40px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: arial, 'helvetica neue',
                                helvetica, sans-serif;
                              line-height: 21px;
                              color: #666666;
                              font-size: 14px;
                            "
                          >
                            <strong
                              >Details of your&nbsp;deposit :</strong
                            ><br />Amount : ${amount} USD<br />Charge :
                            <span style="color: #ff0000">0 USD</span
                            ><br />
                            status :declined
                            <br /><br /><span style="font-size: 12px"
                              >Transaction ID : ${id}</span
                            >
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `;
  return compiler(content, "Declined Deposit request");
};
const successfulDeposit = function (name, amount, id) {
  let content = `
    <table
    class="es-content"
    cellspacing="0"
    cellpadding="0"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          class="es-content-body"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #ffffff;
            border-right: 1px solid #2f4b7a;
            border-left: 1px solid #2f4b7a;
            width: 600px;
          "
          cellspacing="0"
          cellpadding="0"
          bgcolor="#ffffff"
          align="center"
        >
          <tr>
            <td
              class="es-m-p10r es-m-p10l"
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 0;
                margin: 0;
                padding-left: 15px;
                padding-right: 15px;
                background-color: #ffffff;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 568px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 0;
                            margin: 0;
                            font-size: 0px;
                          "
                        >
                          <a
                            style="
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              text-decoration: underline;
                              color: #3d7781;
                              font-size: 14px;
                            "
                            ><img
                              src="https://www.temenosglobal.com/assets/email-images/check.png"
                              alt="Logo"
                              style="
                                display: block;
                                border: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                              "
                              width="70"
                              title="Logo"
                              height="70"
                          /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    class="es-m-p0r"
                    valign="top"
                    align="center"
                    style="padding: 0; margin: 0; width: 558px"
                  >
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          class="es-m-p15b es-m-p5r es-m-p5l"
                          style="
                            margin: 0;
                            padding-top: 10px;
                            padding-bottom: 20px;
                            padding-left: 30px;
                            padding-right: 30px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: arial, 'helvetica neue',
                                helvetica, sans-serif;
                              line-height: 21px;
                              color: #666666;
                              font-size: 14px;
                            "
                          >
                            <strong>Hi ${name} ,</strong
                            >&nbsp;,<br /><br />Your deposit request
                            of <strong>${amount}</strong
                            ><strong>USD</strong> has been confirmed successfully and 
                            credited into your account.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          class="es-m-p25b es-m-p5r es-m-p5l"
                          style="
                            margin: 0;
                            padding-top: 10px;
                            padding-left: 30px;
                            padding-right: 30px;
                            padding-bottom: 40px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: arial, 'helvetica neue',
                                helvetica, sans-serif;
                              line-height: 21px;
                              color: #666666;
                              font-size: 14px;
                            "
                          >
                            <strong
                              >Details of your&nbsp;deposit :</strong
                            ><br />Amount : ${amount} USD<br />Charge :
                            <span style="color: #ff0000">0 USD</span
                            ><br />paid via : Bitcoin<br /><br /><br /><span
                              style="font-size: 12px"
                              >Transaction ID : ${id}</span
                            >
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `;
  return compiler(content, "Successful Deposit to your temenos account");
};

const ChangedPasswordSuccessfully = function (name) {
  let content = `
    <table
    class="es-content"
    cellspacing="0"
    cellpadding="0"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          class="es-content-body"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #ffffff;
            border-right: 1px solid #2f4b7a;
            border-left: 1px solid #2f4b7a;
            width: 600px;
          "
          cellspacing="0"
          cellpadding="0"
          bgcolor="#ffffff"
          align="center"
        >
          <tr>
            <td
              class="es-m-p10r es-m-p10l"
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 0;
                margin: 0;
                padding-left: 15px;
                padding-right: 15px;
                background-color: #ffffff;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 568px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 0;
                            margin: 0;
                            font-size: 0px;
                          "
                        >
                          <a
                            style="
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              text-decoration: underline;
                              color: #3d7781;
                              font-size: 14px;
                            "
                            ><img
                              src="https://www.temenosglobal.com/assets/email-images/check.png"
                              alt="Logo"
                              style="
                                display: block;
                                border: 0;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                              "
                              width="70"
                              title="Logo"
                              height="70"
                          /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    class="es-m-p0r"
                    valign="top"
                    align="center"
                    style="padding: 0; margin: 0; width: 558px"
                  >
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          class="es-m-p15b es-m-p5r es-m-p5l"
                          style="
                            margin: 0;
                            padding-top: 10px;
                            padding-bottom: 20px;
                            padding-left: 30px;
                            padding-right: 30px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: arial, 'helvetica neue',
                                helvetica, sans-serif;
                              line-height: 21px;
                              color: #666666;
                              font-size: 14px;
                            "
                          >
                            <strong>Hi ${name},</strong
                            >&nbsp;,<br /><br />
                            You have successfully changed your password.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `;
  return compiler(content, "Successful Deposit to your temenos account");
};

const requestChangePassword = function(name, timestamp, id){
  let content = `
    <table
    class="es-content"
    cellspacing="0"
    cellpadding="0"
    align="center"
    style="
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
      table-layout: fixed !important;
      width: 100%;
    "
  >
    <tr>
      <td align="center" style="padding: 0; margin: 0">
        <table
          class="es-content-body"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            background-color: #ffffff;
            border-right: 1px solid #2f4b7a;
            border-left: 1px solid #2f4b7a;
            width: 600px;
          "
          cellspacing="0"
          cellpadding="0"
          bgcolor="#ffffff"
          align="center"
        >
          <tr>
            <td
              class="es-m-p10r es-m-p10l"
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 0;
                margin: 0;
                padding-left: 15px;
                padding-right: 15px;
                background-color: #ffffff;
              "
            >
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr>
                  <td
                    align="left"
                    style="padding: 0; margin: 0; width: 568px"
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
               
                <tr>
                  <td
                    class="es-m-p0r"
                    valign="top"
                    align="center"
                    style="padding: 0; margin: 0; width: 558px"
                  >
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          class="es-m-p15b es-m-p5r es-m-p5l"
                          style="
                            margin: 0;
                            padding-top: 10px;
                            padding-bottom: 20px;
                            padding-left: 30px;
                            padding-right: 30px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              -webkit-text-size-adjust: none;
                              -ms-text-size-adjust: none;
                              mso-line-height-rule: exactly;
                              font-family: arial, 'helvetica neue',
                                helvetica, sans-serif;
                              line-height: 21px;
                              color: #666666;
                              font-size: 14px;
                            "
                          >
                            <strong>Dear ${name},</strong
                            >&nbsp;,<br /><br />
                            We received your request to change your password and has sent you a link to reset your password through your email . The link is valid only for 24hours.
                             <br><br>
                           <a href="temenosglobal.com/changepassword/${timestamp}/${id}"> https://temenosglobal.com/changepassword/${timestamp}/${id} </a>
                           <br>
                           The link is valid only for 24hours.
                           <br><br>
                           The essence of creating a direct personalized link for you is to provide adequate security and protect our client information and investment.
                           Please ignore if the request was not made by you 
                              Thanks.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `;
  return compiler(content, "Successful Deposit to your temenos account");
}
module.exports = {
  declinedWithdraw,
  successfulWithdraw,
  declinedDeposit,
  successfulDeposit,
  ChangedPasswordSuccessfully,
  requestChangePassword
};

// remember to changing the image URL from temenos and all text-image content

