package in.edac.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="emp_id")
	private long empId;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "project_id",referencedColumnName="project_id")
	private Project project;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "team_lead_id", referencedColumnName = "id")
	private User teamLead;
//	private long team_lead_id;
	
	@OneToMany(mappedBy = "employee1")
	@JsonIgnore
	private List<Task> taskId;

	public Employee() {
	super();
}

	public Employee(User user, Project project, User teamLead, List<Task> taskId) {
		super();
		this.user = user;
		this.project = project;
		this.teamLead = teamLead;
		this.taskId = taskId;
	}

	public long getEmpId() {
		return empId;
	}

	public void setEmpId(long empId) {
		this.empId = empId;
	}



	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public User getTeamLead() {
		return teamLead;
	}

	public void setTeamLead(User teamLead) {
		this.teamLead = teamLead;
	}

	public List<Task> getTaskId() {
		return taskId;
	}

	public void setTaskId(List<Task> taskId) {
		this.taskId = taskId;
	}
	

}