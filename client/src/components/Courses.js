// stateful component

const Courses = (props) => {
    console.log(props.courses)
    return(
        <main>
            <div className="wrap main--grid">
                {props.courses.map(course => 
                    <a className="course--module course--link" href="course-detail.html">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </a>
                    )}
            </div>
        </main>
    )
}

export default Courses;