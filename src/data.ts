export const jobTitles = [
    { label: 'Project Manager', id: 0 },
    { label: 'Product Designer', id: 1 },
    { label: 'Graphic Designer', id: 2 },
    { label: 'Motion Designer', id: 3 },
    { label: 'Software Engineer', id: 4 },
    { label: 'Front-End Engineer', id: 5 },
    { label: 'Back-End Engineer', id: 6 },
];

export const templates = [
    {
        label: 'Without contacts',
        id: 1,
        template: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="font-family: Arial, sans-serif; border-collapse: collapse;">
                <!-- Logo Sidebar -->
                <tr>
                    <td bgcolor="#333" width="120" style="vertical-align: middle; padding: 10px; color: #fff;">
                        <img src="https://via.placeholder.com/48" alt="Company Logo" width="48" border="0" style="display:block; border:none; outline:none; text-decoration:none; margin: 0 auto;">
                    </td>
                    <td bgcolor="#f4f4f4" style="padding: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <!-- Name -->
                            <tr>
                                <td style="font-weight: bold; font-size: 14px; padding-bottom: 5px;">John Doe</td>
                            </tr>
                            <!-- Position -->
                            <tr>
                                <td style="font-size: 12px; padding-bottom: 5px;">Position Title</td>
                            </tr>
                            <!-- Phone -->
                            <tr>
                                <td style="font-size: 12px; padding-bottom: 5px;">Phone: +1 (234) 567-890</td>
                            </tr>
                            <!-- Email -->
                            <tr>
                                <td style="font-size: 12px; padding-bottom: 5px;">Email: <a href="mailto:john.doe@company.com" style="text-decoration:none; color: #333;">john.doe@company.com</a></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- Address -->
                <tr>
                    <td bgcolor="#666" colspan="2" style="font-size: 12px; padding: 5px 15px; color: #fff;">
                        Company Name, Street Address, City, Zip
                    </td>
                </tr>
            </table>
        </body>
        </html>        
        `    },
];
