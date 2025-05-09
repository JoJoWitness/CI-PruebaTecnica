import { type DropdownMultipleProps, type DropdownProps, type EnumDropdownProps, type EnumValues, type DropdownMultipleGeneralProps, type EnumDropdownProjectProps, type UserLogType, type UserLogProp, type InputTextProjectType, type InputTextTaskType, type ProjectDropdownProps, type InputTextUserType, type EnumDropdownUserProps } from "~/schemas/types";

export const InputTextProject = ({ label, register, value}: InputTextProjectType) => {
  return (
  <div className="flex flex-col">
    <label className="font-bold"> {label} </label>
    <input className="border border-dark-background dark:border-background rounded p-2 sm:w-80 w-60"
      {...register(value)}
      />
  </div>
  )
}  

export const InputTextTask = ({ label, register, value}: InputTextTaskType) => {
  return (
  <div className="flex flex-col ">
    <label className="font-bold"> {label} </label>
    <input className="border border-dark-background dark:border-background rounded p-2 sm:w-80 w-60"
      {...register(value)}
      />
  </div>
  )
}  

export const InputTextUser = ({ label, register, value}: InputTextUserType) => {
  return (
  <div className="flex flex-col ">
    <label className="font-bold"> {label} </label>
    <input className="border border-dark-background dark:border-background rounded p-2 sm:w-80 w-60"
      {...register(value)}
      />
  </div>
  )
}  

export const DropdownInputSingle = ({ label, users, userType, register, value }: DropdownProps) => {
  const filteredUsers = users.filter((user) => user.role === userType);

  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>
      <select {...register(value, { valueAsNumber: true })} className="border border-dark-background
       dark:border-background rounded bg-background-100 dark:bg-dark-background-100 p-2 sm:w-80 w-60 ">
        <option value="">Select a {userType.toLowerCase()}</option>
        {filteredUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};


export const DropdownProject: React.FC<ProjectDropdownProps> = ({ label, projects, register, value }) => {
  return (
    <div className="flex flex-col sm:w-80 w-60">
      <label className="font-bold">{label}</label>
      <select
        {...register(value, { valueAsNumber: true })}
        className="border border-dark-background dark:border-background rounded p-2 bg-background-100 dark:bg-dark-background-100"
      >
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const DropdownInputMultiple = ({ label, users, register, value, setValue, watch }: DropdownMultipleProps & { setValue: any; watch: any }) => {
  const filteredUsers = users.filter((user) => user.role === "USER");
  const selectedUsers = watch(value) || []; 

  const toggleUserSelection = (userId: number) => {
    const updatedSelection = selectedUsers.includes(userId)
      ? selectedUsers.filter((id: number) => id !== userId) 
      : [...selectedUsers, userId]; 

    setValue(value, updatedSelection); 
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block font-bold">{label}</label>
      <div className="flex flex-wrap gap-2 max-h-40 sm:w-80 w-60 overflow-auto scrollbar-custom">
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => toggleUserSelection(user.id)}
            className={`px-4 py-2 rounded-lg border-2 font-bold ${
              selectedUsers.includes(user.id)
                ? "bg-primary text-background dark:text-dark-background"
                : "bg-background-100 dark:bg-dark-background-100 text-primary"
            }`}
          >
            {user.name}
          </button>
        ))}
      </div>

    </div>
  );
};

export const DropdownInputGeneralMultiple = ({ label, users, register, value }: DropdownMultipleGeneralProps) => {
  return (
    <div className="flex flex-col sm:w-80 w-60">
      <label className="block font-bold">{label}</label>
      <select
        {...register(value, { valueAsNumber: true })}
        className="border border-dark-background dark:border-background rounded p-2 
        dark:bg-dark-background-100 bg-background-100"
      >
        {users.map((user) => (
          <option className="font-bold sm:w-80 w-60 " key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const EnumDropdown = ({ label, enumType, register, value }: EnumDropdownProps) => {
  return (
    <div className="flex flex-col sm:w-80 w-60">
      <label className="font-bold">{label}</label>
      <select {...register(value)} className="border border-dark-background dark:border-background rounded p-2 dark:bg-dark-background-100 bg-background-100 sm:w-80 w-60">
          {/*@ts-ignore*/}
        {enumType.map((enumValue: EnumValues) => (
          <option key={enumValue} value={enumValue}>
            {enumValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export const EnumDropdownProject = ({ label, enumType, register, value }: EnumDropdownProjectProps) => {
    return (
      <div className="flex flex-col sm:w-80 w-60">
        <label className="block font-bold">{label}</label>
        <select {...register(value)} className="border border-dark-background dark:border-background rounded p-2 dark:bg-dark-background-100 bg-background-100">
          {/*@ts-ignore*/}
          {enumType.map((enumValue: EnumValues) => (
            <option key={enumValue} value={enumValue}>
              {enumValue}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export const EnumDropdownUser = ({ label, enumType, register, value }: EnumDropdownUserProps) => {
    return (
      <div className="flex flex-col sm:w-80 w-60">
        <label className="block font-bold">{label}</label>
        <select {...register(value)} className="border border-dark-background dark:border-background rounded p-2 dark:bg-dark-background-100 bg-background-100">
            {/*@ts-ignore*/}
          {enumType.map((enumValue: EnumValues) => (
            <option key={enumValue} value={enumValue}>
              {enumValue}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
export const UserLogInput = ({type, label, register, value }: UserLogProp) => {
  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>
      <input
        type={type}
        {...register(value)}
        className="border border-dark-background dark:border-background rounded p-2 w-60  text-text-primary dark:text-dark-text-primary"
      />
    </div>
  );
}

