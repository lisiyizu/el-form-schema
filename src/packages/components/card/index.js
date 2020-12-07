export default function (createElement, value, data, style = {}) {
    return createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderBottom: "1px solid #E6E7EB",
          paddingBottom: "5px",
          marginBottom: "30px",
          ...style
        }
      },
      [
        createElement("span", {
          style: {
            borderLeft: `4px solid ${data.color || "#5584FF"}`,
            width: "0px",
            height: "20px",
            lineHeight: "20px"
          }
        }),
        createElement(
          "span",
          {
            style: {
              paddingLeft: "5px",
              color: "#333333",
              fontSize: "18px"
            }
          },
          data.title
        ),
        data.slot && data.slot.right
          ? createElement(
              "div",
              {
                style: {
                  paddingLeft: "5px",
                  color: "#333333",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flex: 1
                }
              },
              data.slot.right
            )
          : []
      ]
    );
}
