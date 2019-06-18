project_path=YOUR_PORJECT_PATH
sa_log_path=YOUR_SA_LOG_PATH 
#sa_log_path=/var/log/sa/

cd ${project_path}

sar -u -f ${sa_log_path}sa`date -d "1 day ago" +%d` > u_`date -d "1 day ago" +%Y%m%d`.log
sar -r -f ${sa_log_path}sa`date -d "1 day ago" +%d` > r_`date -d "1 day ago" +%Y%m%d`.log
sar -n DEV -f ${sa_log_path}sa`date -d "1 day ago" +%d` > n_`date -d "1 day ago" +%Y%m%d`.log
sar -d -f ${sa_log_path}sa`date -d "1 day ago" +%d` > d_`date -d "1 day ago" +%Y%m%d`.log

