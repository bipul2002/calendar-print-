export class PrintDiv {
    static printDivWithCSS(divId: string): void {
        const divToPrint = document.getElementById(divId);
        if (divToPrint) {
            const printWindow = window.open('', '', 'width=600,height=600');
            if (printWindow) {
                const content = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Print</title>
                        <style>
                            @media print {
                                /* Your CSS rules for printing go here */
                                /* Example: */
                                /* Adjust font size and padding */
                                body {
                                    font-size: 12pt;
                                    padding: 10px;
                                }
                                /* Adjust width of the div for printing */
                                #${divId} {
                                    width: 100%;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        ${divToPrint.innerHTML}
                    </body>
                    </html>
                `;
                printWindow.document.open();
                printWindow.document.write(content);
                printWindow.document.close();
                printWindow.print();
            } else {
                console.error("Failed to open print window.");
            }
        } else {
            console.error(`Element with ID ${divId} not found.`);
        }
    }
}
