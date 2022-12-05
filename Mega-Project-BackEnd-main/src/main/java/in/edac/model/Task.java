package in.edac.model;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import in.edac.repository.CustomerDateAndTimeDeserialize;


@Data
@Entity
public class Task{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="task_id")
	private long taskId;
	
	private String taskname;
	
	
	@ManyToOne
	 @JoinColumn(name="emp_id")
    private Employee employee1;

//	private long emp_id;
	@ManyToOne
    @JoinColumn(name="project_id")
    private Project project;

@JsonDeserialize(using=CustomerDateAndTimeDeserialize.class)
	private Date startdate;

@JsonDeserialize(using=CustomerDateAndTimeDeserialize.class)
	private Date enddate;
private String status;
//private String assignedBy;
   
@OneToOne(cascade = CascadeType.ALL)
@JoinColumn(name="assignedBy",referencedColumnName = "id")

private User teamLead;

public Task() {
	super();
}

public Task(String taskname, Employee employee1, Project project, Date startdate, Date enddate, String status,
		User teamLead) {
	super();
	this.taskname = taskname;
	this.employee1 = employee1;
	this.project = project;
	this.startdate = startdate;
	this.enddate = enddate;
	this.status = status;
	this.teamLead = teamLead;
}

public long getTaskId() {
	return taskId;
}

public void setTaskId(long taskId) {
	this.taskId = taskId;
}

public String getTaskname() {
	return taskname;
}

public void setTaskname(String taskname) {
	this.taskname = taskname;
}

public Employee getEmployee1() {
	return employee1;
}

public void setEmployee1(Employee employee1) {
	this.employee1 = employee1;
}

public Project getProject() {
	return project;
}

public void setProject(Project project) {
	this.project = project;
}

public Date getStartdate() {
	return startdate;
}

public void setStartdate(Date startdate) {
	this.startdate = startdate;
}

public Date getEnddate() {
	return enddate;
}

public void setEnddate(Date enddate) {
	this.enddate = enddate;
}

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}

public User getTeamLead() {
	return teamLead;
}

public void setTeamLead(User teamLead) {
	this.teamLead = teamLead;
}


	
	
}