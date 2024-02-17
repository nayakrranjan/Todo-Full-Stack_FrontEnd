import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTodo, getTodo, updateTodo } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Todo() {
    const {id} = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();

    const [task, setTask] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(
        () => function getTodos() {
            if (id != -1) {
                getTodo(username, id)
                .then(response => {
                    setTask(response.data.task);
                    setTargetDate(response.data.targetDate);
                })
            }
        }, [id]
    )

    function onSubmit (values) {
        console.log(values);

        const todo = {
            id: id,
            userName: username,
            task: values.task,
            targetDate: values.targetDate, 
            done: false
        }

        console.log(todo);
        //Calling the Update Todo API
        if (id == -1) {
            createTodo(username, todo)
            .then(response => {
                console.log(response);
                navigate(`/home/${username}`)
            })
            .catch(error => console.log(error)) 
        } else {
            updateTodo(username, id, todo)
            .then(response => {
                console.log(response);
                navigate(`/home/${username}`)
            })
            .catch(error => console.log(error)) 
        }      
    }

    function validate (values) {
        let errors = {
            // targetDate: 'Invalid Target Date'
        }
        if (values.task.length < 3)
            errors.task = 'Task must contain atleast 3 letters'
        return errors;
    }

    return (
        <div className="container w-50 mt-5">
            <div className="text-start">
                <h3>Edit Todo</h3>
            </div>
            <Formik initialValues={ {task, targetDate} } enableReinitialize={true} 
                validate={validate} validateOnChange={false} validateOnBlur={false} onSubmit={onSubmit}>
                {
                    (props) => (
                        <div>
                            <Form>
                                <ErrorMessage
                                    name='task'
                                    component='div'
                                    className='alert alert-warning'
                                />
                                <ErrorMessage
                                    name='targetDate'
                                    component='div'
                                    className='alert alert-warning'
                                />
                                <fieldset className='form-group'>
                                    <label>Task</label>
                                    <Field type='text' className='form-control' name='task'/>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Target Date</label>
                                    <Field type='date' className='form-control' name='targetDate'/>
                                </fieldset>
                                <button className='btn btn-success mt-3' type='submit'>Save</button>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    );
}
