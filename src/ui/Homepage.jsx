import React from 'react'
import { useGlobalContext } from '@/lib/global_context.jsx'
import { Grid, GridItem, Heading, Link, ListItem, OrderedList, UnorderedList } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export default function Homepage() {
    const { global_allowed_routes } = useGlobalContext()

    return (
        <div>
            {
                global_allowed_routes.length === 0 &&
                <ForNonUser />
            }
        </div>
    )
}


function ForNonUser() {

    return (
        <Grid color={'white'} w='90%' m='auto' gap={8}>
            <GridItem gap={2} display={'grid'}>
                <Heading as='h4' fontSize={'1.3rem'} color={'twitter.600'}>Name Change</Heading>
                <p style={{ textIndent: '5rem', textAlign: 'justify' }}>
                    The Name change updation in university records will be approved based on the notifications of Government Gazette. Name Change Updation will be effected by the Controller of Examinations, Anna University, Chennai only for Certificates issued on or after the date of Gazette notification.
                </p>

                <p>
                    The candidates need to apply for Name change updation in University records by submitting the following documents:
                </p>

                <OrderedList paddingLeft={'2rem'}>
                    <ListItem>Filled in application form (Download application) forwarded by the Principal of respective college along with the processing fee.</ListItem>
                    <ListItem>Government Gazette that includes the applicant’s change of name. (First page and the page in which the name has been changed).</ListItem>
                    <ListItem>HSC / SSLC marksheet and Previous semester marksheet. [First year / Lateral Entry students need to submit the attested copy of Hall Ticket].</ListItem>
                </OrderedList>

                <p><Link as={NavLink} to="/name_change/new_or_check_status" color={'lightgreen'} textDecoration={'underline'}>Click here</Link> for Name Change updation and to check status of your Name Change application</p>
            </GridItem>

            <GridItem gap={2} display={'grid'}>

                <Heading as='h4' fontSize={'1.3rem'} color={'twitter.600'}>Grievance</Heading>
                <p>
                    The students of an affiliated engineering colleges under the ambit of Anna University and their parents can approach “The Director, Centre for Student Affairs, Anna University, Chennai”, if they have any grievances in their College. They can send their complaints by post / in person / email, for the following grievances;
                </p>

                <p>
                    Academic grievances:
                </p>

                <UnorderedList>
                    <ListItem>Related to theory and practical classes</ListItem>
                    <ListItem>Related to Internal assessment</ListItem>
                    <ListItem>Related to appearance of semester examinations</ListItem>
                    <ListItem>Related to prevention of students to attend the class</ListItem>
                    <ListItem>Related to Academic schedule</ListItem>
                    <ListItem>Related to special classes</ListItem>
                </UnorderedList>


                <p>

                    Non Academic Grievances:
                </p>
                <UnorderedList>
                    <ListItem>Related to return of certificates.</ListItem>
                    <ListItem>Related to basic facilities in the college and hostel</ListItem>
                    <ListItem>Related to laboratory facilities</ListItem>
                    <ListItem>Related to quality of food in the hostel</ListItem>
                    <ListItem>Related to caution deposit</ListItem>
                    <ListItem>Related to Extracurricular and co-curricular activities</ListItem>
                    <ListItem>Related to medical and transport facilities</ListItem>
                    <ListItem>Related to code of conduct</ListItem>
                    <ListItem>Related to Issue of transfer certificate</ListItem>
                    <ListItem>Related to impose of fine</ListItem>
                    <ListItem>Related to Ragging</ListItem>
                    <ListItem>Related to Harassment of students by faculty / staff members / fellow students</ListItem>
                    <ListItem>Related to indisciplinary activities of the students / staff members</ListItem>
                </UnorderedList>
                <p>
                    The grievances will be redressed by the Centre for Student Affairs as per the rules and regulations of Anna University / AICTE / Tamil Nadu Government.
                </p>

                <p><Link as={NavLink} to="/grievance/new_or_check_status" color={'lightgreen'} textDecoration={'underline'}>Click here</Link> for Grievance registration and to check status of your Grievance application</p>

            </GridItem>


            <GridItem gap={2} display={'grid'}>
                <Heading as='h4' fontSize={'1.3rem'} color={'twitter.600'}>Break of Study</Heading>
                <p style={{ textIndent: '5rem', textAlign: 'justify' }}>
                    A student is permitted to go on break of study for a maximum period of one year as a single spell.

                    Break of Study shall be granted only once for valid reasons for a maximum of one year during the entire period of study of the degree programme. However, in extraordinary situation the candidate may apply for additional break of study not exceeding another one year by paying prescribed fee for break of study.                 </p>

                <p>
                    The candidates need to apply for Break of Study in University records by submitting the following documents:
                </p>

                <OrderedList paddingLeft={'2rem'}>
                    <ListItem>Filled in application form (Download application) forwarded by the Principal of respective college.</ListItem>
                    <ListItem>If the request is on medical grounds,
                        Medical Certificate from an authorized
                        Medical practitioner is to be enclosed for
                        that period</ListItem>
                </OrderedList>

                <p><Link as={NavLink} to="/break_of_study/new" color={'lightgreen'} textDecoration={'underline'}>Click here</Link> for Break of Study application and to check status of your Break of Study application</p>
            </GridItem>
        </Grid>
    )

}