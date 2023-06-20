export const get_break_of_study_PDF = async (data) => {
    const {pdf, Document, View, Page, Text, Image, StyleSheet} = await import('@react-pdf/renderer')
    const horizontal = (value) => {
        return { paddingVertical: `${value}px` }
    }
    const styles = StyleSheet.create({
        page: {
            marginTop: '80px'
        },
        img: {
            height: '60px',
            width: '70px',
            alignSelf: 'center',
            marginBottom: '2px',
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
            padding: '5px',
            paddingHorizontal: '5px',
            justifyContent: 'center'
        },
        s_no: {
            alignSelf: 'center'
        },
        desc_view: {
            width: '250px',
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
            padding: '5px',
            justifyContent: 'center'
        },
        value_view: {
            padding: '5px',
            width: '250px',
            fontFamily: 'Times-Roman',
        },
        value: {
            display: 'flex',
            alignSelf: 'left',
        },
        last: {
            borderBottom: '1px solid #000'
        },
        gap: {
            rowGap: '15px'
        },
        align: {
            width: '85%',
            marginHorizontal: 'auto',
        },
        note: {
            fontFamily: 'Times-Roman',
            fontSize: '13px'
        },
        signature: {
            fontFamily: 'Times-Bold',
            fontSize: '14px',
            textAlign: 'right',
            marginTop: '35px' 
        },
        station: {
            fontFamily: 'Times-Roman', 
            fontSize: '13px',
            rowGap: '10px'
        }
    })
    const {name, register_no, programme, branch, admission, mode_of_study, sems_completed, break_of_study_period, rejoin, completion_academic_year, remaining_period_as_per_regulations, reason, address, prev_break_of_study, prevention_details } = data

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
                <View style={{ ...styles.header }}>
                    <Text style={styles.header_text}></Text>
                </View>
                <View style={{ ...styles.header, marginBottom: '10px' }}>
                    <Text style={styles.header_text}>(To be used by the students of Constituent / Self - Financing Colleges)</Text>
                </View>

                {/*  ***************TABLE******************  */}


                <View style={styles.table}>
                    <View style={styles.s_no_view}>
                        <Text styles={styles.s_no}>  1</Text>
                    </View>

                    <View style={styles.desc_view}>
                        <Text style={styles.desc}>Name of the Student</Text>
                    </View>

                    <View style={styles.value_view}>
                        <Text style={styles.value}>{name}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(5) }}>
                        <Text styles={styles.s_no}>  2</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5) }}>
                        <Text style={styles.desc}>Roll No. / Register No.</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5) }}>
                        <Text style={styles.value}>{register_no}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(5) }}>
                        <Text styles={styles.s_no}>  3</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5) }}>
                        <Text style={styles.desc}>Programme and Branch of study</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5) }}>
                        <Text style={styles.value}>{programme} / {branch}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(10) }}>
                        <Text styles={styles.s_no}>  4</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(10) }}>
                        <Text style={styles.desc}>Month and year of admission to the Degree Programme (I Semester)</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(10) }}>
                        <Text style={styles.value}>{admission?.month} / {admission?.year}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(5) }}>
                        <Text styles={styles.s_no}>  5</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5) }}>
                        <Text style={styles.desc}>Mode of Study</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5) }}>
                        <Text style={styles.value}>{mode_of_study}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(5) }}>
                        <Text styles={styles.s_no}>  6</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5) }}>
                        <Text style={styles.desc}>Number of semesters completed (Specify the Period) </Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5), rowGap: '15px' }}>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>Semester: {sems_completed?.sem}</Text>
                        <View style={{display: 'flex', flexDirection: 'row', gap: '15px'}}>
                            <Text style={{fontFamily: 'Times-Bold'}}>From:</Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{sems_completed?.from?.month} / {sems_completed?.from?.year}</Text>
                            <Text style={{fontFamily: 'Times-Bold'}}>To:</Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{sems_completed?.to?.month} / {sems_completed?.to?.year}</Text>

                        </View>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(5) }}>
                        <Text styles={styles.s_no}>  7</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5) }}>
                        <Text style={styles.desc}>Semester, Duration & Period for which the Break of study is sought for</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5)}}>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>Semester: {break_of_study_period?.sem}</Text>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>Duration: {break_of_study_period?.duration}</Text>
                        <View style={{display: 'flex', flexDirection: 'row', gap: '13px'}}>
                            <Text style={{fontFamily: 'Times-Roman'}}>Period</Text>
                            <Text style={{fontFamily: 'Times-Bold'}}>From: </Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{break_of_study_period?.from?.month} / {break_of_study_period?.from?.year}</Text>
                            <Text style={{fontFamily: 'Times-Bold'}}>To:</Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{break_of_study_period?.to?.month} / {break_of_study_period?.to?.year}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(8) }}>
                        <Text styles={styles.s_no}>  8</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(8) }}>
                        <Text style={styles.desc}>Session and Academic year during which the student propose to rejoin and continue</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(8) }}>
                        <Text style={styles.value}>{rejoin?.sem} / {rejoin?.academic_year}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={{ ...styles.s_no_view, ...horizontal(5) }}>
                        <Text styles={styles.s_no}>  9</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5) }}>
                        <Text style={styles.desc}>Mention the academic year in which the maximum period for completion&nbsp; of the&nbsp;&nbsp;programme normally ends as per&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Regulations (UG / PG)</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5) }}>
                        <Text style={styles.value}>{completion_academic_year}</Text>
                    </View>
                </View>

                <View style={{ ...styles.table, ...styles.last }}>
                    <View style={{ ...styles.s_no_view, ...horizontal(4) }}>
                        <Text styles={styles.s_no}>10</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5) }}>
                        <Text style={styles.desc}>Whether the remaining period after rejoining the course is as per Regulations</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5) }}>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>{remaining_period_as_per_regulations ? 'Yes' : 'No'}</Text>
                    </View>
                </View>
            </Page>

            <Page size='A4' style={styles.page}>
                <View style={{ ...styles.table }}>
                    <View style={{ ...styles.s_no_view, ...horizontal(4) }}>
                        <Text styles={styles.s_no}>11</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5), ...styles.gap }}>
                        <Text style={styles.desc}>Reasons for the request of break of study (please specify)</Text>
                        <Text style={styles.desc}>
                            (Full time students are not eligible for break
                            of study if they go for higher studies or job
                            or training programmes irrelevant to current
                            degree programme.)
                        </Text>
                        <Text>
                            (If the request is on medical grounds,&nbsp;&nbsp;&nbsp;&nbsp; Medical Certificate from an authorized
                            Medical practitioner is to be enclosed for
                            that period)    
                        </Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5) }}>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>{reason}</Text>
                    </View>
                </View>

                <View style={{ ...styles.table }}>
                    <View style={{ ...styles.s_no_view, ...horizontal(4) }}>
                        <Text styles={styles.s_no}>12</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Full address for communication during the time of break of study (with pin code & phone no.)</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5) }}>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>{address}</Text>
                    </View>
                </View>

                <View style={{ ...styles.table }}>
                    <View style={{ ...styles.s_no_view, ...horizontal(4) }}>
                        <Text styles={styles.s_no}>13</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Details of break of study availed previously, if any</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5), rowGap: '15px' }}>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>Semester: {prev_break_of_study?.sem}</Text>
                        <View style={{display: 'flex', flexDirection: 'row', gap: '15px'}}>
                            <Text style={{fontFamily: 'Times-Bold'}}>From:</Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{prev_break_of_study?.from?.month} / {prev_break_of_study?.from?.year}</Text>
                            <Text style={{fontFamily: 'Times-Bold'}}>To:</Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{prev_break_of_study?.to?.month} / {prev_break_of_study?.to?.year}</Text>

                        </View>
                    </View>
                </View>

                <View style={{ ...styles.table, ...styles.last}}>
                    <View style={{ ...styles.s_no_view, ...horizontal(4) }}>
                        <Text styles={styles.s_no}>14</Text>
                    </View>

                    <View style={{ ...styles.desc_view, ...horizontal(5)}}>
                        <Text style={styles.desc}>Details of prevention due to lack of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; attendance (if any) during the course of study till the date of application for Break of Study</Text>
                    </View>

                    <View style={{ ...styles.value_view, ...horizontal(5), rowGap: '15px' }}>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>Semester: {prevention_details?.sem}</Text>
                        <View style={{display: 'flex', flexDirection: 'row', gap: '15px'}}>
                            <Text style={{fontFamily: 'Times-Bold'}}>From:</Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{prevention_details?.from?.month} / {prevention_details?.from?.year}</Text>
                            <Text style={{fontFamily: 'Times-Bold'}}>To:</Text>
                            <Text style={{fontFamily: 'Times-Roman'}}>{prevention_details?.to?.month} / {prevention_details?.to?.year}</Text>

                        </View>
                        <Text style={{ ...styles.value, fontFamily: 'Times-Roman' }}>(Mention the semester during which the&nbsp;&nbsp;&nbsp; candidate was prevented)</Text>
                    </View>
                </View>


                <View style={{...styles.note, ...styles.align}}>
                    <Text>Note: Incomplete applications will not be processed.</Text>
                </View>

                <View style={{...styles.signature, ...styles.align}}>
                    <Text>SIGNATURE OF THE STUDENT</Text>
                </View>

                <View style={{...styles.align, ...styles.station}}>
                    <Text>Station: </Text>
                    <Text>Date: </Text>
                </View>

                <View style={{...styles.signature, ...styles.align}}>
                    <Text>SIGNATURE OF THE PRINCIPAL WITH SEAL</Text>
                </View>

                <View style={{...styles.align, ...styles.station}}>
                    <Text style={{fontFamily: 'Times-Bold', textDecoration: 'underline'}}>Enclosure: </Text>
                    <View style={{paddingLeft: '20px', rowGap: '10px'}}>
                        <Text>1. Representation from the candidate</Text>
                        <Text>2. Enclose Medical Certificate if required.</Text>
                    </View>
                </View>
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
