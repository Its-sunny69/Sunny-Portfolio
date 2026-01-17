import {
  Html,
  Body,
  Container,
  Text,
  Hr,
  Section,
  Head,
  Heading,
} from "@react-email/components";

export default function EmailTemplate({
  message = "This is testing message lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}: {
  message: string;
}) {
  return (
    <Html>
      <Head>
        <title>Response From Portfolio</title>
      </Head>
      <Body
        style={{
          fontFamily:
            "'Josefin Sans', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', sans-serif",
          backgroundColor: "#f4f4f4",
          color: "black",
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "15px",
          }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <Heading
              as="h2"
              style={{
                fontWeight: "bold",
                margin: "0 0 20px 0",
              }}
            >
              Message From Your Portfolio Website &#128075;
            </Heading>
            <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#666666",
                marginTop: "15px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
                borderRadius: "4px",
              }}
            >
              {message}
            </Text>
            <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />
            <Text
              style={{ fontSize: "12px", color: "#999999", marginTop: "20px" }}
            >
              Best regards,
              <br />
              <b>Your Portfolio</b>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
