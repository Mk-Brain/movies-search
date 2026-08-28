import React from 'react'
import { Box } from "@mui/material";

export const Avatar = ({ picture, width, height }: { picture: string, width: number, height: number }) => {
    return (
        <Box
            sx={{
                width: width,
                height: height,
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid #fff",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.2)",
                backgroundColor: "#e5e7eb",
            }}
        >
            <img
                src={picture}
                alt={"profil"}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </Box>
    )
}
