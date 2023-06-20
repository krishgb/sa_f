export const getPDF = async (data) => {
    const {StyleSheet, View, Text, Page, Document, Image, pdf} = await import('@react-pdf/renderer')
    const { old_name, new_name, register_no, course, branch, sem, institution, gazette_page_no, gazette_release_date, email_id, phone, price} = data
    
        const horizontal = (value) => {
        return {paddingVertical: `${value}px`}
    }
    const styles = StyleSheet.create({
        img: {
            height: '60px',
            width: '70px',
            alignSelf: 'center',
            marginBottom: '2px',
            marginTop: '15px'
        },
        header_text: {
            display: 'flex',
            alignSelf: 'center',
            fontSize: '13px',
            fontFamily: 'Times-Bold'
        },
        table: {
            fontSize: '13px',
            fontFamily: 'Times-Roman',
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
            marginHorizontal: 'auto',
            border: '1px solid #000',
            borderBottom: 'none'
        },
        s_no_view: {
            padding: '15px',
            paddingHorizontal: '5px'
        },
        s_no: {
            alignSelf: 'center'
        },
        desc_view: {
            width: '250px',
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
            padding: '15px'
        },
        value_view: {
            padding: '15px',
            width: '250px',
        },
        value: {
            display: 'flex',
            alignSelf: 'left',
            fontFamily: 'Times-Roman',
        },
        last: {
            borderBottom: '1px solid #000',
            alignItems: 'center',
        },
        declaration: {
            marginTop: '10px',
            fontSize: '13px',
            fontFamily: 'Times-Bold',
            alignSelf: 'center',
            textDecoration: 'underline'
        },
        declaration_text: {
            fontFamily: 'Times-Roman',
            fontSize: '13px',
            textIndent: '20px',
            paddingHorizontal: '50px',

            marginTop: '10px',
        },
        signature_candidate: {
            fontFamily: 'Times-Bold',
            alignSelf: 'flex-end',
            fontSize: '13px',
            marginTop: '40px',
            marginRight: '50px'
        },
        forwarded: {
            fontFamily: 'Times-Bold',
            alignSelf: 'center',
            fontSize: '13px'
        },
        date: {
            fontFamily: 'Times-Roman',
            fontSize: '13px',
            marginLeft: '50px',
            marginTop: '10px'
        },
        principal: {
            fontFamily: 'Times-Bold',
            alignSelf: 'flex-end',
            fontSize: '13px',
            marginTop: '15px',
            marginRight: '50px'
        }
    })

    const PDF = (
        <Document>
            <Page size='A4' style={styles.page}>
                {/*  ***************HEADER******************  */}
                <View>
                    <Image style={styles.img} src='/logo.png' />
                </View>

                <View style={styles.header}>
                    <Text style={styles.header_text}>CENTRE FOR STUDENT AFFAIRS</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.header_text}>ANNA UNIVERSITY, CHENNAI</Text>
                </View>
                <View style={{ ...styles.header, marginBottom: '10px' }}>
                    <Text style={styles.header_text}>APPLICATION FOR NAME CHANGE UPDATION</Text>
                </View>

                {/*  ***************TABLE******************  */}


                {/* ---------------OLD NAME----------- */}
                <View style={styles.table}>
                    <View style={styles.s_no_view}>
                        <Text styles={styles.s_no}>  1</Text>
                    </View>

                    <View style={styles.desc_view}>
                        <Text style={styles.desc}>Name and Address of the Candidate</Text>
                        <Text>(Old name in CAPITAL LETTERS)</Text>
                    </View>

                    <View style={styles.value_view}>
                        <Text style={styles.value}>{old_name}</Text>
                    </View>
                </View>

                {/* ---------------Register Number----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(5)}}>
                        <Text styles={styles.s_no}>  2</Text>
                    </View>

                    <View style={{...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Register Number</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(5)}}>
                        <Text style={styles.value}>{register_no}</Text>
                    </View>
                </View>

                {/* ---------------Course / Branch / Semester----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(5)}}>
                        <Text styles={styles.s_no}>  3</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Course / Branch / Semester</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(5)}}>
                        <Text style={styles.value}>{course} / {branch} / {sem}</Text>
                    </View>
                </View>

                {/* ---------------INSTITUTION NAME----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(10)}}>
                        <Text styles={styles.s_no}>  4</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(10)}}>
                        <Text style={styles.desc}>Name of the Institution</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(10)}}>
                        <Text style={styles.value}>{institution}</Text>
                    </View>
                </View>

                {/* ---------------NEW NAME----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(5)}}>
                        <Text styles={styles.s_no}>  5</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>New Name of the Student</Text>
                        <Text>( in CAPITAL LETTERS )</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(5)}}>
                        <Text style={styles.value}>{new_name}</Text>
                    </View>
                </View>

                {/* ---------------GAZETTE PAGE NO----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(5)}}>
                        <Text styles={styles.s_no}>  6</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Tamil Nadu Government Gazette Page No. </Text>
                        <Text>(that includes the name change)</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(5)}}>
                        <Text style={styles.value}>{gazette_page_no}</Text>
                    </View>
                </View>

                {/* ---------------Date of release of Gazette----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(5)}}>
                        <Text styles={styles.s_no}>  7</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Date of release of Gazette</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(5)}}>
                        <Text style={styles.value}>{gazette_release_date}</Text>
                    </View>
                </View>

                {/* ---------------Email ID of the Candidate----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(8)}}>
                        <Text styles={styles.s_no}>  8</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(8)}}>
                        <Text style={styles.desc}>Email ID of the Candidate</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(8)}}>
                        <Text style={styles.value}>{email_id}</Text>
                    </View>
                </View>

                {/* ---------------Contact Phone No.----------- */}
                <View style={styles.table}>
                    <View style={{...styles.s_no_view, ...horizontal(5)}}>
                        <Text styles={styles.s_no}>  9</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Contact Phone No.</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(5)}}>
                        <Text style={styles.value}>{phone}</Text>
                    </View>
                </View>

                {/* ---------------Demand Draft----------- */}
                <View style={{...styles.table, ...styles.last}}>
                    <View style={{...styles.s_no_view, ...horizontal(4)}}>
                        <Text styles={styles.s_no}>10</Text>
                    </View>
                    
                    <View style={{...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Details of Demand Draft:</Text>
                        <Text style={styles.desc}>(Rs. {new Intl.NumberFormat("en-IN").format(price)}/- drawn in favour of </Text>
                        <Text style={styles.desc}>"The Director, Student Affairs, Anna </Text>
                        <Text style={styles.desc}>University, Payable at Chennai")</Text>
                    </View>

                    <View style={{...styles.value_view, ...horizontal(5)}}>
                        <Text style={{...styles.value, fontFamily: 'Times-Roman'}}>DD No.: </Text>
                        <Text style={{...styles.value, fontFamily: 'Times-Roman'}}>Bank and Branch: </Text>
                        <Text style={{...styles.value, fontFamily: 'Times-Roman'}}>Date: </Text>
                    </View>
                </View>

                {/* *********************DECLARATION***************** */}
                <View style={styles.declaration}>
                    <Text>DECLARATION</Text>
                </View>

                <View style={styles.declaration_text}>
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;I hereby declare that all the details furnished above are true and correct to the best of my knowledge and belief </Text>
                </View>

                <View style={styles.signature_candidate}>
                    <Text style={styles.right}>Signature of the Candidate</Text>
                </View>

                
                <View style={styles.forwarded}>
                    <Text>Forwarded by</Text>
                </View>


                
                <View style={styles.date}>
                    <Text>Date:</Text>
                </View>

                
                <View style={styles.principal}>
                    <Text>Signature of the Principal</Text>
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(With office Seal)</Text>
                </View>

                <View style={{borderTop: '1px solid #000', marginHorizontal: '50px'}}></View>
            </Page>
        </Document>
    )

    return window.URL.createObjectURL(await pdf(PDF).toBlob())

}


// import React, { memo } from 'react'
// import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'


// function PDF(props) {
//     const { old_name, new_name, register_no, course, branch, sem, institution, gazette_page_no, gazette_release_date, email_id, phone, price} = props

//     const horizontal = (value) => {
//         return {paddingVertical: `${value}px`}
//     }
//     const styles = StyleSheet.create({
//         img: {
//             height: '60px',
//             width: '70px',
//             alignSelf: 'center',
//             marginBottom: '2px',
//             marginTop: '15px'
//         },
//         header_text: {
//             display: 'flex',
//             alignSelf: 'center',
//             fontSize: '13px',
//             fontFamily: 'Times-Bold'
//         },
//         table: {
//             fontSize: '13px',
//             fontFamily: 'Times-Roman',
//             display: 'flex',
//             flexDirection: 'row',
//             width: '85%',
//             marginHorizontal: 'auto',
//             border: '1px solid #000',
//             borderBottom: 'none'
//         },
//         s_no_view: {
//             padding: '15px',
//             paddingHorizontal: '5px'
//         },
//         s_no: {
//             alignSelf: 'center'
//         },
//         desc_view: {
//             width: '250px',
//             borderLeft: '1px solid #000',
//             borderRight: '1px solid #000',
//             padding: '15px'
//         },
//         value_view: {
//             padding: '15px',
//             width: '250px',
//         },
//         value: {
//             display: 'flex',
//             alignSelf: 'left',
//             fontFamily: 'Times-Roman',
//         },
//         last: {
//             borderBottom: '1px solid #000',
//             alignItems: 'center',
//         },
//         declaration: {
//             marginTop: '10px',
//             fontSize: '13px',
//             fontFamily: 'Times-Bold',
//             alignSelf: 'center',
//             textDecoration: 'underline'
//         },
//         declaration_text: {
//             fontFamily: 'Times-Roman',
//             fontSize: '13px',
//             textIndent: '20px',
//             paddingHorizontal: '50px',

//             marginTop: '10px',
//         },
//         signature_candidate: {
//             fontFamily: 'Times-Bold',
//             alignSelf: 'flex-end',
//             fontSize: '13px',
//             marginTop: '40px',
//             marginRight: '50px'
//         },
//         forwarded: {
//             fontFamily: 'Times-Bold',
//             alignSelf: 'center',
//             fontSize: '13px'
//         },
//         date: {
//             fontFamily: 'Times-Roman',
//             fontSize: '13px',
//             marginLeft: '50px',
//             marginTop: '10px'
//         },
//         principal: {
//             fontFamily: 'Times-Bold',
//             alignSelf: 'flex-end',
//             fontSize: '13px',
//             marginTop: '15px',
//             marginRight: '50px'
//         }
//     })

//     return (
//         <Document>
//             <Page size='A4' style={styles.page}>
//                 {/*  ***************HEADER******************  */}
//                 <View>
//                     <Image style={styles.img} src='/logo.png' />
//                 </View>

//                 <View style={styles.header}>
//                     <Text style={styles.header_text}>CENTRE FOR STUDENT AFFAIRS</Text>
//                 </View>
//                 <View style={styles.header}>
//                     <Text style={styles.header_text}>ANNA UNIVERSITY, CHENNAI</Text>
//                 </View>
//                 <View style={{ ...styles.header, marginBottom: '10px' }}>
//                     <Text style={styles.header_text}>APPLICATION FOR NAME CHANGE UPDATION</Text>
//                 </View>

//                 {/*  ***************TABLE******************  */}


//                 {/* ---------------OLD NAME----------- */}
//                 <View style={styles.table}>
//                     <View style={styles.s_no_view}>
//                         <Text styles={styles.s_no}>  1</Text>
//                     </View>

//                     <View style={styles.desc_view}>
//                         <Text style={styles.desc}>Name and Address of the Candidate</Text>
//                         <Text>(Old name in CAPITAL LETTERS)</Text>
//                     </View>

//                     <View style={styles.value_view}>
//                         <Text style={styles.value}>{old_name}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------Register Number----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(5)}}>
//                         <Text styles={styles.s_no}>  2</Text>
//                     </View>

//                     <View style={{...styles.desc_view, ...horizontal(5)}}>
//                         <Text style={styles.desc}>Register Number</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(5)}}>
//                         <Text style={styles.value}>{register_no}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------Course / Branch / Semester----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(5)}}>
//                         <Text styles={styles.s_no}>  3</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(5)}}>
//                         <Text style={styles.desc}>Course / Branch / Semester</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(5)}}>
//                         <Text style={styles.value}>{course} / {branch} / {sem}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------INSTITUTION NAME----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(10)}}>
//                         <Text styles={styles.s_no}>  4</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(10)}}>
//                         <Text style={styles.desc}>Name of the Institution</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(10)}}>
//                         <Text style={styles.value}>{institution}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------NEW NAME----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(5)}}>
//                         <Text styles={styles.s_no}>  5</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(5)}}>
//                         <Text style={styles.desc}>New Name of the Student</Text>
//                         <Text>( in CAPITAL LETTERS )</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(5)}}>
//                         <Text style={styles.value}>{new_name}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------GAZETTE PAGE NO----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(5)}}>
//                         <Text styles={styles.s_no}>  6</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(5)}}>
//                         <Text style={styles.desc}>Tamil Nadu Government Gazette Page No. </Text>
//                         <Text>(that includes the name change)</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(5)}}>
//                         <Text style={styles.value}>{gazette_page_no}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------Date of release of Gazette----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(5)}}>
//                         <Text styles={styles.s_no}>  7</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(5)}}>
//                         <Text style={styles.desc}>Date of release of Gazette</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(5)}}>
//                         <Text style={styles.value}>{gazette_release_date}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------Email ID of the Candidate----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(8)}}>
//                         <Text styles={styles.s_no}>  8</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(8)}}>
//                         <Text style={styles.desc}>Email ID of the Candidate</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(8)}}>
//                         <Text style={styles.value}>{email_id}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------Contact Phone No.----------- */}
//                 <View style={styles.table}>
//                     <View style={{...styles.s_no_view, ...horizontal(5)}}>
//                         <Text styles={styles.s_no}>  9</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(5)}}>
//                         <Text style={styles.desc}>Contact Phone No.</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(5)}}>
//                         <Text style={styles.value}>{phone}</Text>
//                     </View>
//                 </View>

//                 {/* ---------------Demand Draft----------- */}
//                 <View style={{...styles.table, ...styles.last}}>
//                     <View style={{...styles.s_no_view, ...horizontal(4)}}>
//                         <Text styles={styles.s_no}>10</Text>
//                     </View>
                    
//                     <View style={{...styles.desc_view, ...horizontal(5)}}>
//                         <Text style={styles.desc}>Details of Demand Draft:</Text>
//                         <Text style={styles.desc}>(Rs. {new Intl.NumberFormat("en-IN").format(price)}/- drawn in favour of </Text>
//                         <Text style={styles.desc}>"The Director, Student Affairs, Anna </Text>
//                         <Text style={styles.desc}>University, Payable at Chennai")</Text>
//                     </View>

//                     <View style={{...styles.value_view, ...horizontal(5)}}>
//                         <Text style={{...styles.value, fontFamily: 'Times-Roman'}}>DD No.: </Text>
//                         <Text style={{...styles.value, fontFamily: 'Times-Roman'}}>Bank and Branch: </Text>
//                         <Text style={{...styles.value, fontFamily: 'Times-Roman'}}>Date: </Text>
//                     </View>
//                 </View>

//                 {/* *********************DECLARATION***************** */}
//                 <View style={styles.declaration}>
//                     <Text>DECLARATION</Text>
//                 </View>

//                 <View style={styles.declaration_text}>
//                     <Text>&nbsp;&nbsp;&nbsp;&nbsp;I hereby declare that all the details furnished above are true and correct to the best of my knowledge and belief </Text>
//                 </View>

//                 <View style={styles.signature_candidate}>
//                     <Text style={styles.right}>Signature of the Candidate</Text>
//                 </View>

                
//                 <View style={styles.forwarded}>
//                     <Text>Forwarded by</Text>
//                 </View>


                
//                 <View style={styles.date}>
//                     <Text>Date:</Text>
//                 </View>

                
//                 <View style={styles.principal}>
//                     <Text>Signature of the Principal</Text>
//                     <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(With office Seal)</Text>
//                 </View>

//                 <View style={{borderTop: '1px solid #000', marginHorizontal: '50px'}}></View>
//             </Page>
//         </Document>
//     )
// }

// export default memo(PDF)
