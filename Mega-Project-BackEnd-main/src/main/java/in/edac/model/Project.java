package in.edac.model;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Project{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="project_id")
	private long projectId;
	
	@OneToMany(mappedBy = "project")
	@JsonIgnore
    private List<Employee> employee;
	
	@OneToMany(mappedBy = "project")
	@JsonIgnore
    private List<Task> task;
    
	private String projectName;
	
//	private long team_lead_id;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "team_lead_id", referencedColumnName = "id")
	private User teamLead;
	public Project() {
		super();
	}
	
	
	public Project(List<Employee> employee, List<Task> task, String projectName, User teamLead) {
		super();
		this.employee = employee;
		this.task = task;
		this.projectName = projectName;
		this.teamLead = teamLead;
	}


	public long getProjectId() {
		return projectId;
	}
	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}
	public List<Employee> getEmployee() {
		return employee;
	}
	public void setEmployee(List<Employee> employee) {
		this.employee = employee;
	}
	public List<Task> getTask() {
		return task;
	}
	public void setTask(List<Task> task) {
		this.task = task;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public User getTeamLead() {
		return teamLead;
	}
	public void setTeamLead(User teamLead) {
		this.teamLead = teamLead;
	}
	
	
	
	
}